import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { pgPool?: Pool };

const createPool = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    max: 2,
    idleTimeoutMillis: 5_000,
  });
  attachDatabasePool(pool);
  return pool;
};

export const pool = globalForDb.pgPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pool;

export const db = drizzle({ client: pool, relations: schema.authRelations });
