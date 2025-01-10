import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.svm import SVC
from pathlib import Path
from typing import List
import numpy as np
from usearch.index import Index
from collections import Counter
import pickle
import os
import io
import torch
import json
import requests
from PIL import Image
from transformers import AutoModelForImageClassification, ViTImageProcessor

class EmsembleSVM():
    def __init__(self, dir) -> None:
        self.model_path = list(Path(dir).glob("*"))
        self.model_names = [path.stem for path in self.model_path]
        self.id_2_label = {i:label for i, label in enumerate(self.model_names)}
        self.num_labels = len(self.id_2_label)
        self.svm_classifiers = [SVC(kernel='linear', probability=True) for _ in range(len(self.model_path))]

        for i, path in enumerate(self.model_path):
            with open(path, 'rb') as f:
                self.svm_classifiers[i] = pickle.load(f)

    def predict(self, x: List[np.ndarray]):
        result = []
        for svm in self.svm_classifiers:
            y_pred = svm.predict_proba(x)[:, 1] # List[np array]
            result.append(y_pred)
        result = np.stack(result, axis=1)
        return result

    def get_label(self, result):
        tag_id = np.argmax(result, axis=1)[0]
        tag = self.id_2_label[tag_id]
        return tag, tag_id
    
class Ranker():
    def __init__(self, model_path: str, db_path: str):
        self.index = Index(ndim=1792)
        self.topic_label_index = Index(ndim=1792)
        
        os.makedirs(db_path, exist_ok=True)
        if not os.path.exists(f"{db_path}/main.index"):
            self.index.save(f"{db_path}/main.index")
        self.index.load(f"{db_path}/main.index")
        
        self.model = SentenceTransformer(f"{model_path}/onnx", backend="onnx")
        
        self.classifier = EmsembleSVM(f'{model_path}/department_label')
        
        self.topic_label_index.load(f"{model_path}/topic_label/proposal.index")
        
        with open("model/topic_label/proposal_cluster_labels.pkl", "rb") as f:
            x, self.cluster_labels, self.id_2_label = pickle.load(f)
        
        del x
 
    def embed(self, id: int, x: str):
        vector = self.model.encode(x)
        self.index.add(id, vector)

    async def save_db(self):
        self.index.save("db/main.index")
    
    def index_rank(self, query: str, topk: int):
        query_embedding = self.model.encode(query)
        result = self.index.search(query_embedding, topk)
        return result.keys, result.distances
    
    def get_tags(self, query: str):
        query_embedding = self.model.encode(query)
        
        if query_embedding.ndim == 1:
            query_embedding = query_embedding[None, :]
        result = self.classifier.predict(query_embedding)
        department_label, department_label_id = self.classifier.get_label(result)
        
        result = self.topic_label_index.search(query_embedding, 5)
        # print("\n".join(x[k] for k in result.keys))
        # print(cluster_labels[result.keys])
        most_similar = Counter(self.cluster_labels[result.keys]).most_common(1)[0][0]
        # print(f"Most similar proposal: {most_similar}")
        print([self.id_2_label[k] for k in self.cluster_labels[result.keys]])
        
        if self.id_2_label[most_similar] != None:
            topic_label = self.id_2_label[most_similar].strip("\n")
        else:
            topic_label = None
        
        return department_label, topic_label

class Moderator():
    def __init__(self, model_path: str) -> None:
        self.processor = ViTImageProcessor.from_pretrained(f'{model_path}/nsfw_classify/preprocessor_config.json', local_files_only=True)
        self.model = AutoModelForImageClassification.from_pretrained(f"{model_path}/nsfw_classify", local_files_only=True)
        self.url = "https://openrouter.ai/api/v1/chat/completions"
        try:
            with open(".env", 'r', encoding='utf-8') as f:
                OPENROUTER_API_KEY = f.read().strip('\n')
        except:
            print("invalid api key. exiting...")
            os._exit(1)
        
        self.headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}"}
        
    def image_moderation(self, image_bytes: io.BytesIO) -> bool:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        with torch.no_grad():
            inputs = self.processor(images=image, return_tensors="pt")
            outputs = self.model(**inputs)
            logits = outputs.logits
        
        predicted_label = logits.argmax(-1).item()
        
        return True if predicted_label else False
    
    def text_moderation(self, text: str):
        prompt = f"""請判斷以下內容是否為 NSFW (不適合工作場所) 內容：

                    *   **內容：** {text}

                    *   **判斷標準：**

                        *   **NSFW：** 包含裸露、性暗示、性描寫、性行為畫面等內容，或是包含髒話。
                        *   **SFW：** 不包含任何 NSFW 內容。

                    *   **額外指示：**
                        *   應寬鬆看待政治相關內容，除非內容明顯違法或煽動暴力。政治相關內容本身 *不構成* NSFW。
                        *   若內容包含理性、客觀的政治討論，即使立場與政府不同，也應視為 SFW。
                        *   判斷是否為 NSFW 時，應著重於內容是否具有性暗示或性相關的本質。

                    *   **輸出格式：** 請輸出 NSFW 或是 SFW 代表分類結果，不要做任何解釋或輸出其他內容。
                    """
        response = requests.post(
                    url=self.url,
                    headers=self.headers,
                    data=json.dumps({
                                "model": "google/gemini-flash-1.5",
                                "messages": [
                                    {
                                        "role": "user",
                                        "content": (
                                            prompt
                                        ),
                                    }
                                ],
                            }
                        )
                    )
        
        result = response.json()["choices"][0]["message"]["content"].strip('\n')
        if result != "NSFW" and result != "SFW":
            result = False
        else:
            result = True if result == "NSFW" else False
        return result

