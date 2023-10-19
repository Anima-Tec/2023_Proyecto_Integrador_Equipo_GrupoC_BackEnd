/*
  Warnings:

  - Added the required column `genero` to the `Prenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prenda` ADD COLUMN `genero` VARCHAR(191) NOT NULL;
