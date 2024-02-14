-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_offer_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "offer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
