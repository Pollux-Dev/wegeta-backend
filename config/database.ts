import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");
  // const host = env("DATABASE_HOST_INTERNAL", "postgres");
  console.log("THIS IS THE DATABASE CLIENT ------- : ", client);

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        // host: env('DATABASE_HOST', 'localhost'),
        // host: env('DATABASE_HOST_EXTERNAL', 'localhost'),
        host: env("DATABASE_HOST_INTERNAL", "localhost"), // "internal" is for 'Render' to connect to the database inside its vps
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "wegegta"),
        user: env("DATABASE_USERNAME", "wegegta"),
        password: env("DATABASE_PASSWORD", "wegegta"),

        // ssl: { rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false) },
        ssl: false,

        /*ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED',
            true
          ),
        },*/
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", "databse/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};


// list all db in postgres in terminal
