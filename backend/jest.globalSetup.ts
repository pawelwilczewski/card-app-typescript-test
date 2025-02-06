import dotenv from "dotenv";
import { execSync } from "node:child_process";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });

export default async function globalSetup(): Promise<void> {
  execSync("npx prisma migrate reset --force", { stdio: "inherit" });
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
}
