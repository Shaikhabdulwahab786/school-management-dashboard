/*
  Warnings:

  - A unique constraint covering the columns `[publicToken]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - The required column `publicToken` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "publicEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publicToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_publicToken_key" ON "Student"("publicToken");
