import { createHash } from "crypto";

export default function HashFromString(item: string): string {
  return createHash("sha256").update(item).digest("hex");
}
