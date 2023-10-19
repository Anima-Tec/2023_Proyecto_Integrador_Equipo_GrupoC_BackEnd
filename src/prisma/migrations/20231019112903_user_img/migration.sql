/*
  Warnings:

  - Added the required column `imagen` to the `Prenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prenda` ADD COLUMN `imagen` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imagen` VARCHAR(191) NOT NULL;
