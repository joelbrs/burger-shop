import "dotenv/config";
import { z } from "zod";

const env_schema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  PORT: z.coerce.number().default(8080),
});

const _env = env_schema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environent configs: ", _env.error.format());
  throw new Error("Invalid environment config!");
}

export const env = _env.data;
