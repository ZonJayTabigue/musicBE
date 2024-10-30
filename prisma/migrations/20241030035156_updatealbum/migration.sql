/*
  Warnings:

  - Added the required column `album_cover_big` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `album_cover_medium` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `album_cover_small` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "album_cover_big" TEXT NOT NULL,
ADD COLUMN     "album_cover_medium" TEXT NOT NULL,
ADD COLUMN     "album_cover_small" TEXT NOT NULL;
