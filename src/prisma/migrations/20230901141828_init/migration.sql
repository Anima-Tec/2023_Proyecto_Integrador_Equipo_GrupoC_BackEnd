/*
  Warnings:

  - You are about to drop the column `constrasena` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `concdtrasena` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `constrasena`,
    ADD COLUMN `concdtrasena` VARCHAR(191) NOT NULL;
