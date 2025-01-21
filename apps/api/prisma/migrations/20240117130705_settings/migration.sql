/*
  Warnings:

  - The values [String] on the enum `ValueType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `valueStr` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `vocabulary_progresses` table. All the data in the column will be lost.
  - Added the required column `next_step_date` to the `vocabulary_progresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `vocabulary_progresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ValueType_new" AS ENUM ('Number', 'Boolean', 'Json');
ALTER TABLE "settings" ALTER COLUMN "valueType" TYPE "ValueType_new" USING ("valueType"::text::"ValueType_new");
ALTER TYPE "ValueType" RENAME TO "ValueType_old";
ALTER TYPE "ValueType_new" RENAME TO "ValueType";
DROP TYPE "ValueType_old";
COMMIT;

-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "defaultValueBool" BOOLEAN,
ADD COLUMN     "defaultValueInt" INTEGER,
ADD COLUMN     "defaultValueJson" JSONB;

-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "valueStr",
ADD COLUMN     "valueJson" JSONB;

-- AlterTable
ALTER TABLE "vocabulary_progresses" DROP COLUMN "created_at",
ADD COLUMN     "next_step_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vocabulary_progresses" ADD CONSTRAINT "vocabulary_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
