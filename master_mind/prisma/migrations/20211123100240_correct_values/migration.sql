/*
  Warnings:

  - You are about to alter the column `foundCombination` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `numberOfTries` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "combination" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "numberOfTries" INTEGER NOT NULL DEFAULT 1,
    "foundCombination" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Game" ("combination", "foundCombination", "id", "numberOfTries", "user") SELECT "combination", "foundCombination", "id", "numberOfTries", "user" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
