/*
  Warnings:

  - You are about to drop the column `idPrenda` on the `categoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_idPrenda_fkey`;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `idPrenda`;

-- CreateTable
CREATE TABLE `_CategoriaToPrenda` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaToPrenda_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToPrenda_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoriaToPrenda` ADD CONSTRAINT `_CategoriaToPrenda_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToPrenda` ADD CONSTRAINT `_CategoriaToPrenda_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prenda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
