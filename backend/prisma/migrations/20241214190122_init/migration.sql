/*
  Warnings:

  - You are about to drop the column `filePath` on the `document` table. All the data in the column will be lost.
  - Added the required column `file_data` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `document` DROP COLUMN `filePath`,
    ADD COLUMN `file_data` LONGBLOB NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
