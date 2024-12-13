# Citizen Proposal App

## Backend Development

Ensure that your Docker Compose version is at least 2.24.0 by checking with
`docker compose version`.

### With Visual Studio

To start development on the backend ASP.NET Core app with a local test DB,
follow these steps:

1. Create a directory in the project root called `secrets`.
2. Create two files in `secrets` named `MYSQL_USER` and `MYSQL_PASSWORD`.
3. Write the username you want to use into `MYSQL_USER` and the password into
   `MYSQL_PASSWORD`. This will be the user that does CRUD operations in the
   backend app.
4. (Optional) You can also put other environment variables you want the DB to
   use into `env/mysql.env`. For its syntax, check the
   [docs](https://docs.docker.com/reference/compose-file/services/#env_file-format).
5. `cd` into the project root and start **only** the DB service with `docker
   compose up -d db`.
6. After a few seconds, check the logs of the DB service with either `docker
   compose logs` or with the Docker Desktop GUI. You should see the line
   `GENERATED ROOT PASSWORD: ...`. This will be the root password of the DB.

   Below that, you should see the table:

   |user|host|generated password|auth_factor|
   |-|-|-|-|
   |Migrator|%|\<Migrator password\>|1|

   This will be the password of the "Migrator" user. Only this user will have
   the necessary permissions to run migrations. Remember this password so you
   can apply migrations later.

   Note that if a `datadir` already exists, the passwords will not be
   regenerated. [This also applies to `MYSQL_USER` and
   `MYSQL_PASSWORD`](https://github.com/docker-library/docs/tree/master/mysql#environment-variables).
   You can check if you have one by running `docker volume ls` and see if the
   output contains `mysql-data`, or by using the Docker Desktop GUI.
7. Open the backend project solution file with Visual Studio. Right click on the
   CitizenProposalApp project in the Solution Explorer and click on Manage User
   Secrets. Add the following line to the JSON file that shows up and replace
   the `Uid` and `Pwd`:

   ```json
   "ConnectionStrings:CitizenProposalApp": "Server=CitizenProposalAppDb;Database=CitizenProposalApp;Uid=<your username>;Pwd=<your password>"
   ```

8. Migrate the database to initialize the schema and provide initial data by
   running `dotnet ef database update --connection
   "Server=localhost;Port=37591;Database=CitizenProposalApp;Uid=Migrator;Pwd='<Migrator
   random password>'"` in the `backend` directory. Note the single quotes around
   the password since the random password usually contains special characters.
9. Click on the green play button in VS. The backend app should now be able to
   communicate with the DB. The reason why we have to use VS separately instead
   of using `docker compose` is because VS uses special optimizations with
   Docker containers. This is called "fast mode". It also makes debugging
   easier.

### Without Visual Studio

Note that the backend app no longer uses HTTPS if you use this method, because
it's expected that there will be a reverse proxy in the production environment
that will handle HTTPS and forward the request to the backend app using HTTP. If
you still want to set up HTTPS using a development certificate, see step 5.

Frontend developers might need to start the backend app and the DB without VS
and debugging. In that case, follow these steps:

1. Create a directory in the project root called `secrets`.
2. Create two files in `secrets` named `MYSQL_USER` and `MYSQL_PASSWORD`.
3. Write the username you want to use into `MYSQL_USER` and the password into
   `MYSQL_PASSWORD`. This will be the user that does CRUD operations in the
   backend app.
4. (Optional) You can also put other environment variables you want the DB to
   use into `env/mysql.env`. For its syntax, check the
   [docs](https://docs.docker.com/reference/compose-file/services/#env_file-format).
5. Create the file `env/backend.env` and write the following lines in it and replace
   the `Uid` and `Pwd`:

   ```plaintext
   ConnectionStrings__CitizenProposalApp=Server=CitizenProposalAppDb;Database=CitizenProposalApp;Uid=<your username>;Pwd=<your password>
   ```

   If you also want to set up HTTPS, and the following two more lines:

   ```plaintext
   ASPNETCORE_Kestrel__Certificates__Default__Path=/app/DevelopmentCertificateDoNotUseForProduction.pfx
   ASPNETCORE_Kestrel__Certificates__Default__Password=testpassword
   ```

   And add `- ASPNETCORE_HTTPS_PORTS=8081` under `services.backend.environment`,
   and `- 8081:8081` under `services.backend.ports` in `compose.yml`. You can
   customize the port number to your liking.

6. Run `docker compose --profile backend up -d` to start the backend app and the DB.
7. After a few seconds, check the logs of the DB service with either `docker
   compose logs` or with the Docker Desktop GUI. You should see the line
   `GENERATED ROOT PASSWORD: ...`. This will be the root password of the DB.

   Below that, you should see the table:

   |user|host|generated password|auth_factor|
   |-|-|-|-|
   |Migrator|%|\<Migrator password\>|1|

   This will be the password of the "Migrator" user. Only this user will have
   the necessary permissions to run migrations. Remember this password so you
   can apply migrations later.

   Note that if a `datadir` already exists, the passwords will not be
   regenerated. [This also applies to `MYSQL_USER` and
   `MYSQL_PASSWORD`](https://github.com/docker-library/docs/tree/master/mysql#environment-variables).
   You can check if you have one by running `docker volume ls` and see if the
   output contains `mysql-data`, or by using the Docker Desktop GUI.
8. Run a migration SQL script to initialize the database schema and provide
   initial data. The scripts are located in `backend/Migrations/Scripts`. In
   this directory, each directory name represents which migration do the scripts
   inside migrate from. A special case is the directory named "0". The scripts
   inside migrate from no migration. If you are starting fresh, you most likely
   need to use the scripts inside the "0" directory. Each migration SQL script
   uses the same name as the migration `.cs` files in `backend/Migrations` but
   without the timestamp, so if you don't know which script is newer, you can
   check the timestamps on the filenames of the `.cs` files.

   After you have chosen which script to run, run `mysql -h localhost -P 37591
   -uMigrator '-p<Migrator password>' CitizenProposalApp -e "source <path to SQL
   script>"`.
9. You should now be able to access the backend **from the host** using wither
   <http://localhost> or <https://localhost>. If your app is running inside a
   container, however, you'll need to use <http://CitizenProposalApp> (HTTPS is
   not supported and not needed when connecting from a container).

Note that `docker compose up` won't automatically rebuild images, unlike VS's
container tools. If you have updated the source code of the backend and want to
test it, be sure to supply the `--build` option to `docker compose up`.

## AI Development

To build and deploy the AI container, follow these steps:

1. cd into the AI directory:

   ```bash
   cd AI
   ```

2. download machine-learning models from
   [huggingface](https://huggingface.co/alan314159/CitizenProposalApp), and put
   them in the `models` directory like this. You can use `download_models.sh` to
   download the models.

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
