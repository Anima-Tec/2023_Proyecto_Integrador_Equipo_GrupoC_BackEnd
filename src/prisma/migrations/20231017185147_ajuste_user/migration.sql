/*
  Warnings:

  - You are about to drop the `dona` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lugar_retiro` to the `Articulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Articulo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dona` DROP FOREIGN KEY `Dona_idArticulo_fkey`;

-- DropForeignKey
ALTER TABLE `dona` DROP FOREIGN KEY `Dona_idUser_fkey`;

-- AlterTable
ALTER TABLE `articulo` ADD COLUMN `lugar_retiro` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `edad` VARCHAR(191) NOT NULL,
    MODIFY `celular` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `dona`;
