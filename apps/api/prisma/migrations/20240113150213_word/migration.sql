/*
  Warnings:

  - You are about to drop the column `word` on the `vocabulary` table. All the data in the column will be lost.
  - Added the required column `word_id` to the `vocabulary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vocabulary" DROP COLUMN "word",
ADD COLUMN     "word_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
