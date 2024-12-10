# Citizen Proposal App

## Backend Development

To start development on the backend ASP.NET Core app with a local test DB,
follow these steps:

1. Create a directory in the project root called `secrets`.
2. Create two files in `secrets` named `MYSQL_USER` and `MYSQL_PASSWORD`.
3. Write the username you want to use into `MYSQL_USER` and the password into
   `MYSQL_PASSWORD`.
4. (Optional) You can also put other environment variables you want the DB to
   use into `env/mysql.env`. For its syntax, check the
   [docs](https://docs.docker.com/reference/compose-file/services/#env_file-format).
5. `cd` into the project root and start **only** the DB service with `docker
   compose up -d db`.
6. After a few seconds, check the logs of the DB service with either `docker
   compose logs` or with the Docker Desktop GUI. You should see the line
   `GENERATED ROOT PASSWORD: ...`. This will be the root password of the DB.
   Note that if a `datadir` already exists, the root password will not be
   regenerated. [This also applies to `MYSQL_USER` and
   `MYSQL_PASSWORD`](https://github.com/docker-library/docs/tree/master/mysql#environment-variables).
   You can check if you have one by running `docker volume ls` and see if the
   output contains `mysql-data`, or by using the Docker Desktop GUI.
7. Open the backend project solution file with Visual Studio. Right click on the
   CitizenProposalApp project in the Solution Explorer and click on Manage User
   Secrets. Add the following line to the JSON file that shows up:

   ```json
   "ConnectionStrings:CitizenProposalApp": "server=CitizenProposalAppDb;database=CitizenProposalApp;uid=<your username>;pwd=<your password>"
   ```

8. Click on the green play button. The backend app should now be able to
   communicate with the DB. The reason why we have to use VS separately instead
   of using `docker compose` is because VS uses special optimizations with
   Docker containers. This is called "fast mode". It also makes debugging
   easier.

## AI Development

To build and deploy the AI container, follow these steps:

1. cd into the AI directory:

```bash
cd AI
```
2. download machine-learning models from [huggingface](https://huggingface.co/alan314159/CitizenProposalApp), and put them in the `models` directory like this. You can use `download_models.sh` to download the models.

```bash
.
├── department_label
│   ├── 中央選舉委員會.pkl
│   ├── 交通部.pkl
│   ├── 僑務委員會.pkl
│   ├── 內政部.pkl
│   ├── 公平交易委員會.pkl
│   ├── 勞動部.pkl
│   ├── 國家通訊傳播委員會.pkl
│   ├── 國軍退除役官兵輔導委員會.pkl
│   ├── 國防部.pkl
│   ├── 外交部.pkl
│   ├── 客家委員會.pkl
│   ├── 教育部.pkl
│   ├── 文化部.pkl
│   ├── 法務部.pkl
│   ├── 環境部.pkl
│   ├── 經濟部.pkl
│   ├── 行政院主計總處.pkl
│   ├── 行政院人事行政總處.pkl
│   ├── 衛生福利部.pkl
│   ├── 財政部.pkl
│   ├── 農業部.pkl
│   └── 金融監督管理委員會.pkl
├── onnx
│   ├── 1_Pooling
│   │   └── config.json
│   ├── 2_Dense
│   │   ├── config.json
│   │   └── model.safetensors
│   ├── config.json
│   ├── config_sentence_transformers.json
│   ├── modules.json
│   ├── onnx
│   │   └── model.onnx
│   ├── README.md
│   ├── sentence_bert_config.json
│   ├── special_tokens_map.json
│   ├── tokenizer_config.json
│   ├── tokenizer.json
│   └── vocab.txt
└── topic_label
    ├── proposal_cluster_labels.pkl
    └── proposal.index
```


3. build the docker image with the following command:

```bash
docker build -t citizenproposalapp-ai .
```

4. run the docker container with the following command:

```bash
docker run -d -p 5001:5001 citizenproposalapp-ai
```