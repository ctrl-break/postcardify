-- CreateTable
CREATE TABLE "word_usages" (
    "id" SERIAL NOT NULL,
    "word_id" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "translation" TEXT,
    "user_id" INTEGER,
    "grammar_rule_id" INTEGER,

    CONSTRAINT "word_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grammar_rules" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "explanation" TEXT,

    CONSTRAINT "grammar_rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "word_usages" ADD CONSTRAINT "word_usages_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_usages" ADD CONSTRAINT "word_usages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_usages" ADD CONSTRAINT "word_usages_grammar_rule_id_fkey" FOREIGN KEY ("grammar_rule_id") REFERENCES "grammar_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
