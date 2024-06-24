# to-do-list

REST API service that allows users to register and create, read, update, delete tasks.

## Getting Started

1. Clone the repository.

```sh
$ git clone https://github.com/d-tv/to-do-list
```

2. Install dependencies.

```sh
$ npm install
```

3. Create the `.env` file and open it with your favorite text editor to fill in the environment variables (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`).

```sh
$ touch .env

$ code .env
```

4. Start the server.

```sh
$ npx prisma db push

$ npm run start
```

## Docker

1. Install `docker` and `docker-compose`.
2. Clone the repository and create the `.env` file.
   1. Here you also need to fill out the following environment variables: `DATABASE_URL`, `POSTGRES_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`.
   2. The `DATABASE_URL` for the postgres container should be `DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres`.
3. Run `docker-compose up` in the root of the repository. This will start the application as well as the database.
4. Now the application and the database should be up and running at `http://localhost:8080`.

## License

MIT
