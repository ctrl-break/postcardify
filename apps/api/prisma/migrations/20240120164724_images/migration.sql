/*
  Warnings:

  - You are about to drop the column `defaultValueBool` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `defaultValueInt` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `defaultValueJson` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `valueType` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `setting_id` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `valueBool` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `valueInt` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `valueJson` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `userWord` on the `vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `vocabulary_progresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code,value_type]` on the table `settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value_type` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setting_code` to the `user_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_setting_id_setting_value_type_fkey";

-- DropIndex
DROP INDEX "settings_code_valueType_key";

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "defaultValueBool",
DROP COLUMN "defaultValueInt",
DROP COLUMN "defaultValueJson",
DROP COLUMN "valueType",
ADD COLUMN     "default_value_bool" BOOLEAN,
ADD COLUMN     "default_value_int" INTEGER,
ADD COLUMN     "default_value_json" JSONB,
ADD COLUMN     "value_type" "ValueType" NOT NULL;

-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "setting_id",
DROP COLUMN "valueBool",
DROP COLUMN "valueInt",
DROP COLUMN "valueJson",
ADD COLUMN     "setting_code" TEXT NOT NULL,
ADD COLUMN     "value_bool" BOOLEAN,
ADD COLUMN     "value_int" INTEGER,
ADD COLUMN     "value_json" JSONB;

-- AlterTable
ALTER TABLE "vocabulary" DROP COLUMN "userWord",
ADD COLUMN     "user_word" TEXT;

-- AlterTable
ALTER TABLE "vocabulary_progresses" DROP COLUMN "isComplete",
ADD COLUMN     "is_complete" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "settings_code_value_type_key" ON "settings"("code", "value_type");

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_setting_code_setting_value_type_fkey" FOREIGN KEY ("setting_code", "setting_value_type") REFERENCES "settings"("code", "value_type") ON DELETE RESTRICT ON UPDATE CASCADE;
