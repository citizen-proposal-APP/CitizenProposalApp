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

 