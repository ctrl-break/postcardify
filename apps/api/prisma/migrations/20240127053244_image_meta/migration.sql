-- CreateEnum
CREATE TYPE "ImageProvider" AS ENUM ('unsplash', 'pixabay');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "authorLink" TEXT,
ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "external_id" TEXT,
ADD COLUMN     "provider" "ImageProvider",
ADD COLUMN     "urls" JSONB;
