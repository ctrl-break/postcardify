-- AlterTable
ALTER TABLE "words" ADD COLUMN     "defaultImageId" INTEGER;

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_defaultImageId_fkey" FOREIGN KEY ("defaultImageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
