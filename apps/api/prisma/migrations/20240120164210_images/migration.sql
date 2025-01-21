/*
  Warnings:

  - You are about to drop the column `imageId` on the `vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `defaultImageId` on the `words` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vocabulary" DROP CONSTRAINT "vocabulary_imageId_fkey";

-- DropForeignKey
ALTER TABLE "words" DROP CONSTRAINT "words_defaultImageId_fkey";

-- AlterTable
ALTER TABLE "vocabulary" DROP COLUMN "imageId",
ADD COLUMN     "image_id" INTEGER;

-- AlterTable
ALTER TABLE "words" DROP COLUMN "defaultImageId",
ADD COLUMN     "default_image_id" INTEGER;

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_default_image_id_fkey" FOREIGN KEY ("default_image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
