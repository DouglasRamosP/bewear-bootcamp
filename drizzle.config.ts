import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  connectionString: process.env.DATABASE_URL!,
} satisfies Config;
