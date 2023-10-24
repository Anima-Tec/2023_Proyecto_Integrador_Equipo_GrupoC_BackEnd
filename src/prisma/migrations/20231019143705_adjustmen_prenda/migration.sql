/*
  Warnings:

  - Added the required column `talle` to the `Prenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prenda` ADD COLUMN `talle` VARCHAR(191) NOT NULL;
