# Citizen Proposal App

- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
  - [Docker](#docker)
  - [Components](#components)

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

## Frontend Development

No additional installations are required to make the frontend work. `yarn` is already included with the project.

1. Clone the repository.
2. Run `yarn install` in `frontend/` to install all dependencies.
3. Run `yarn dev` in `frontend/` to start the development server.

### Docker

To start only the frontend container, run:

```sh
docker compose up -d frontend
```

You should now be able to access the frontend at `localhost:80`.

### Components

| Component    | Description                      | Note                                                              |
|--------------|----------------------------------|-------------------------------------------------------------------|
| ActionToggle | Color scheme toggle              |                                                                   |
| HeaderMenu   | Desktop navigation               | This component should not be used directly. Use `Layout` instead. |
| Layout       | Default layout structure         |                                                                   |
| Logo         | Logo of the application          |                                                                   |
| NavbarNested | Mobile navigation                | This component should not be used directly. Use `Layout` instead. |
| ProposalCard | Unified way to display proposals | Use with `SimpleGrid` or `Container` is recommended.              |
