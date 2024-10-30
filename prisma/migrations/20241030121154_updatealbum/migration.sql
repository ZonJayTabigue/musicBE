/*
  Warnings:

  - Added the required column `album_cover_xl` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "album_cover_xl" TEXT NOT NULL;
