/*
  Warnings:

  - You are about to drop the column `value` on the `settings` table. All the data in the column will be lost.
  - Added the required column `valueType` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('Number', 'String', 'Boolean');

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "value",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "valueType" "ValueType" NOT NULL;

-- AlterTable
ALTER TABLE "user_settings" ADD COLUMN     "valueBool" BOOLEAN,
ADD COLUMN     "valueInt" INTEGER,
ADD COLUMN     "valueStr" TEXT;
