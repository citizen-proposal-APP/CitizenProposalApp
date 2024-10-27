import pickle
from collections import Counter
import numpy as np
from numpy.linalg import norm
from sentence_transformers import SentenceTransformer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import classification_report, f1_score
import argparse


def main(args):
    model = SentenceTransformer(args.emb_model).to(args.device)
    GPT_model = args.gpt_model
    
    with open("data/train/proposal.txt", 'r', encoding='utf-8') as f:
        x = f.read().split("\n")

    query_emb = model.encode(x)
    with open(f"data/train/result_{GPT_model}.pkl", 'rb') as f:
        result = pickle.load(f)

    result_counts = dict(Counter(result.values()))
    print(result_counts)
    train_targets = [k for k, v in result_counts.items() if v > 30]

    def train_svm(pos: np.ndarray, neg: np.ndarray, name: str):
        # Create labels for the embeddings
        pos_labels = np.ones(pos.shape[0])
        neg_labels = np.zeros(neg.shape[0])

        # Combine the embeddings and labels
        X = np.vstack((pos, neg))
        y = np.concatenate((pos_labels, neg_labels))

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Initialize and train the SVM classifier
        svm_classifier = SVC(kernel='linear')
        svm_classifier.fit(X_train, y_train)

        # Make predictions on the test set
        y_pred = svm_classifier.predict(X_test)

        # Evaluate the classifier
        # accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        report = classification_report(y_test, y_pred)

        print(f"Name: {name}, F1: {f1 * 100:.2f}")
        print("Classification Report:")
        print(report)
        
        with open(f"model/{name}.pkl", 'wb') as f:
            pickle.dump(svm_classifier, f)

    for train_target in train_targets:
        target_idx = np.array([k for k, v in result.items() if v == train_target])
        all_indices = np.arange(len(x))
        complement_idx = np.setdiff1d(all_indices, target_idx)
        sampled_complement_idx = np.random.choice(complement_idx,  int(len(target_idx) * 1.2), replace=False)
        print(f"name: {train_target}, target idx len: {len(target_idx)}, comp idx len: {len(sampled_complement_idx)}")
        
        pos = query_emb[target_idx]
        neg = query_emb[sampled_complement_idx]
        
        train_svm(pos, neg, train_target)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate training data for proposals.")
    parser.add_argument("--emb-model", type=str, default="infgrad/stella-base-zh-v3-1792d", help="The model to use for embedding query.")
    parser.add_argument("--gpt-model", type=str, required=True, help="The model to generate training data.")
    parser.add_argument("--device", type=str, default="cpu", help="device to run at.")
    args = parser.parse_args()
    main(args)
