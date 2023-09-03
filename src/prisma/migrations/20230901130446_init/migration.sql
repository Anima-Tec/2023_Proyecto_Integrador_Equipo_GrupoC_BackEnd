/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cel]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `constrasena` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `constrasena` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_cel_key` ON `Usuario`(`cel`);
