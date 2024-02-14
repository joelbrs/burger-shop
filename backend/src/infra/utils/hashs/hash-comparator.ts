import { timingSafeEqual } from "crypto";

export async function compare(hash1: string, hash2: string) {
  return timingSafeEqual(StringToBuffer(hash1), StringToBuffer(hash2));
}

function StringToBuffer(item: string) {
  return Buffer.from(item, "utf8");
}
