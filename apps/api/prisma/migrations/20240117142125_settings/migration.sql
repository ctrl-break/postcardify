/*
  Warnings:

  - The primary key for the `settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `settings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_setting_id_fkey";

-- AlterTable
ALTER TABLE "settings" DROP CONSTRAINT "settings_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "settings_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "user_settings" ALTER COLUMN "setting_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "settings"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
