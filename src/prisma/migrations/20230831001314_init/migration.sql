/*
  Warnings:

  - You are about to drop the column `idPrenda` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_idPrenda_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `idPrenda`;
