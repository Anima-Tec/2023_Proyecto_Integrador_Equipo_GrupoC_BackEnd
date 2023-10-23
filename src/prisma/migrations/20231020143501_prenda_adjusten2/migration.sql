/*
  Warnings:

  - Added the required column `idUser` to the `Prenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prenda` ADD COLUMN `idUser` INTEGER NOT NULL;
