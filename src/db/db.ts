import "dotenv/config";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema,
  casing: "snake_case",
});
