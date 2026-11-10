import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { env } from "@/lib/env";

const globalForDb = globalThis as unknown as { pgPool?: Pool };

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: true,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    keepAlive: true,
  });
  pool.on("error", (err) => {
    console.error("[pg-pool] Lỗi đột ngột trên idle connection:", err);
  });

  attachDatabasePool(pool);
  return pool;
};

export const pool = globalForDb.pgPool ?? createPool();
if (env.NODE_ENV !== "production") globalForDb.pgPool = pool;

export const db = drizzle({
  client: pool,
  relations: {
    ...schema.authRelations,
    ...schema.projectRelations,
  },
});
