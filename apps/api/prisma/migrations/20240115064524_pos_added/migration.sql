-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Part_of_Speech" ADD VALUE 'auxiliary';
ALTER TYPE "Part_of_Speech" ADD VALUE 'modal';
ALTER TYPE "Part_of_Speech" ADD VALUE 'number';
ALTER TYPE "Part_of_Speech" ADD VALUE 'marker';
