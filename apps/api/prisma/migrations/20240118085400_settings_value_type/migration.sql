/*
  Warnings:

  - A unique constraint covering the columns `[code,valueType]` on the table `settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `setting_value_type` to the `user_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_setting_id_fkey";

-- AlterTable
ALTER TABLE "user_settings" ADD COLUMN     "setting_value_type" "ValueType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "settings_code_valueType_key" ON "settings"("code", "valueType");

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_setting_id_setting_value_type_fkey" FOREIGN KEY ("setting_id", "setting_value_type") REFERENCES "settings"("code", "valueType") ON DELETE RESTRICT ON UPDATE CASCADE;
