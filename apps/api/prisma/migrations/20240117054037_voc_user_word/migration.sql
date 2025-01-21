-- DropForeignKey
ALTER TABLE "vocabulary" DROP CONSTRAINT "vocabulary_word_id_fkey";

-- AlterTable
ALTER TABLE "vocabulary" ADD COLUMN     "userWord" TEXT,
ALTER COLUMN "word_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE SET NULL ON UPDATE CASCADE;
