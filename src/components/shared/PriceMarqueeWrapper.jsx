
import { connection } from "next/server";
import PriceMarquee from "@/components/shared/PriceMarquee";

export default async function PriceMarqueeWrapper() {
  await connection();

  return <PriceMarquee />;
}