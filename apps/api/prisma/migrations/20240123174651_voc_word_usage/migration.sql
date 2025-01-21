-- DropForeignKey
ALTER TABLE "word_usages" DROP CONSTRAINT "word_usages_word_id_fkey";

-- AlterTable
ALTER TABLE "word_usages" ADD COLUMN     "vocabulary_id" INTEGER,
ALTER COLUMN "word_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "word_usages" ADD CONSTRAINT "word_usages_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_usages" ADD CONSTRAINT "word_usages_vocabulary_id_fkey" FOREIGN KEY ("vocabulary_id") REFERENCES "vocabulary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
