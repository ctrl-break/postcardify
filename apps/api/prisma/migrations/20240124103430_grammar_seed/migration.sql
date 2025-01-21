/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `grammar_rules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "grammar_rules_code_key" ON "grammar_rules"("code");
