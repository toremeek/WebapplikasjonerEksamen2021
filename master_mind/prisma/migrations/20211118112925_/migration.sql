-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "combination" TEXT,
    "user" TEXT,
    "numberOfTries" INTEGER DEFAULT 0,
    "foundCombination" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Game" ("combination", "foundCombination", "id", "numberOfTries", "user") SELECT "combination", "foundCombination", "id", "numberOfTries", "user" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
