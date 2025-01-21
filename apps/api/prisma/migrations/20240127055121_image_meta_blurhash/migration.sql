-- AlterEnum
ALTER TYPE "ImageProvider" ADD VALUE 'local';

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "provider" SET DEFAULT 'unsplash';
