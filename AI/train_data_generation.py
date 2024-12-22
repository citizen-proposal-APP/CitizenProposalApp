import openai
import json
from tqdm import tqdm
import pickle
import argparse

def main(model):
    client = openai.OpenAI(
        base_url="http://localhost:8080/v1",
        api_key = "sk-no-key-required"
    )

    prompt = """你善於分辨台灣中央政府的提案，將他們分配到最適合的部門。在回答時，你會從 ['行政院主計總處', '公平交易委員會', '中央選舉委員會', '行政院人事行政總處', '內政部', '衛生福利部', '國防部', '交通部', '農業部', '法務部', '財政部', '教育部', '外交部', '經濟部', '文化部', '勞動部', '環境部', '國軍退除役官兵輔導委員會', '僑務委員會', '國家科學及技術委員會', '國家通訊傳播委員會'] 中選擇最適合的部門，並以json格式 {\"部門\":\"選擇的部門\"} 回答。"""

    with open("data/train/proposal.txt", 'r', encoding='utf-8') as f:
        query = f.read().split("\n")

    target = {}
    for i, x in tqdm(enumerate(query), total=len(query)):
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": x}
            ],
            temperature=0,
        )
        try:
            jjj = json.loads(completion.choices[0].message.content)
        except:
            print(f"idx: {i}, error loading json: {completion.choices[0].message.content}")
            continue
        
        target[i] = jjj['部門']

    with open(f"result_{model}.pkl", 'wb') as f:
        pickle.dump(target, f)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate training data for proposals.")
    parser.add_argument("--model", type=str, required=True, help="The model to use for generating completions.")
    args = parser.parse_args()
    main(args.model)