import test from "node:test";
import assert from "node:assert/strict";
import { config } from "dotenv";
config({ path: [".env.local", ".env"] });

import { db, pool } from "../src/db/client";
import { sql } from "drizzle-orm";

test("Database client supports interactive transactions", async () => {
  assert.ok(db, "db instance should be defined");
  assert.equal(typeof db.transaction, "function", "db.transaction should be a function");

  // Run interactive transaction
  const result = await db.transaction(async (tx) => {
    const res = await tx.execute(sql`SELECT 1 as val`);
    const rows = "rows" in res ? res.rows : res[0].rows;
    return rows[0];
  });

  assert.ok(result, "Transaction query should return result");
  assert.equal(Number(result.val), 1, "Result val should be 1");
});

test("Database transaction rolls back on error", async () => {
  let executedBeforeError = false;

  await assert.rejects(
    async () => {
      await db.transaction(async (tx) => {
        await tx.execute(sql`SELECT 1`);
        executedBeforeError = true;
        throw new Error("Intentional rollback error");
      });
    },
    /Intentional rollback error/
  );

  assert.equal(executedBeforeError, true);
});

test.after(async () => {
  await pool.end();
});
