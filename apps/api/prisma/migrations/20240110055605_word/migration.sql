/*
  Warnings:

  - You are about to drop the column `dictionary_id` on the `category_association` table. All the data in the column will be lost.
  - You are about to drop the `dictionary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category_association" DROP CONSTRAINT "category_association_dictionary_id_fkey";

-- AlterTable
ALTER TABLE "category_association" DROP COLUMN "dictionary_id",
ADD COLUMN     "word_id" INTEGER;

-- DropTable
DROP TABLE "dictionary";

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "meaning" TEXT,
    "transcription" TEXT,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_association" ADD CONSTRAINT "category_association_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE SET NULL ON UPDATE CASCADE;
