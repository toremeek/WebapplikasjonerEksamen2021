/*
  Warnings:

  - Made the column `numberOfTries` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "combination" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "numberOfTries" TEXT NOT NULL,
    "foundCombination" TEXT NOT NULL
);
INSERT INTO "new_Game" ("combination", "foundCombination", "id", "numberOfTries", "user") SELECT "combination", "foundCombination", "id", "numberOfTries", "user" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
