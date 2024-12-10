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

model = SentenceTransformer("model/onnx", backend="onnx")
classifier = EmsembleSVM('model/department_label')

topic_label_index = Index(ndim=1792)
topic_label_index.load("model/topic_label/proposal.index")

index = Index(ndim=1792)
if not os.path.exists("db/main.index"):
    index.save("db/main.index")
index.load("db/main.index")

with open("model/topic_label/proposal_cluster_labels.pkl", "rb") as f:
    x, cluster_labels, id_2_label = pickle.load(f)

def embed(id: int, x: str):
    vector = model.encode(x)
    index.add(id, vector)

def index_rank(query: str, topk: int):
    query_embedding = model.encode(query)
        
    result = index.search(query_embedding, topk)
    return result.keys

def get_tags(query: str):
    query_embedding = model.encode(query)
    
    if query_embedding.ndim == 1:
        query_embedding = query_embedding[None, :]
    result = classifier.predict(query_embedding)
    department_label, department_label_id = classifier.get_label(result)
    
    result = topic_label_index.search(query_embedding, 5)
    print("\n".join(x[k] for k in result.keys))
    print(cluster_labels[result.keys])
    most_similar = Counter(cluster_labels[result.keys]).most_common(1)[0][0]
    print(f"Most similar proposal: {most_similar}")
    print([id_2_label[k] for k in cluster_labels[result.keys]])
    
    if id_2_label[most_similar] != None:
        topic_label = id_2_label[most_similar].strip("\n")
    else:
        topic_label = None
        
    return department_label, department_label_id, topic_label, most_similar + (classifier.num_labels + 1)

# def get_tags_id():
#     label_dict = deepcopy(classifier.id_2_label)
#     for id, label in id_2_label.item():
#         label_dict[id + tag_offset] = label
#     return label_dict