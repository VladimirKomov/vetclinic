// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from "dotenv";
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

export default {
  development: {
    client: 'pg',
    connection: {
      host: PGHOST,
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      port: PGPORT,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

