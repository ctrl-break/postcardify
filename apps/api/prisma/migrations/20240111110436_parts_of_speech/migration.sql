-- CreateEnum
CREATE TYPE "Part_of_Speech" AS ENUM ('noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'determiner');

-- AlterTable
ALTER TABLE "words" ADD COLUMN     "pos" "Part_of_Speech";
