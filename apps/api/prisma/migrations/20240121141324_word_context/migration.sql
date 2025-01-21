-- AlterTable
ALTER TABLE "words" ADD COLUMN     "context" TEXT,
ADD COLUMN     "translate_variants" JSONB;
