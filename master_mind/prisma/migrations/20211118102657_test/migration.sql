-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "combination" TEXT,
    "user" TEXT NOT NULL,
    "numberOfTries" INTEGER NOT NULL DEFAULT 0,
    "foundCombination" BOOLEAN NOT NULL DEFAULT false
);
