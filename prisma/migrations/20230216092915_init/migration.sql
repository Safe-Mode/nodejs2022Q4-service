/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE user_version_seq;
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT nextval('user_version_seq'),
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
ALTER SEQUENCE user_version_seq OWNED BY "User"."version";

-- DropTable
DROP TABLE "Post";
