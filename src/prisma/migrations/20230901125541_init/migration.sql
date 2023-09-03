-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `edad` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dona` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `idArticulo` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(200) NULL,
    `precio` DOUBLE NOT NULL,
    `id_vendedor` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `talle` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_comprador` INTEGER NOT NULL,
    `id_prenda` INTEGER NOT NULL,
    `fechaCompra` DATETIME(3) NOT NULL,
    `nroCompra` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vende` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_vendedor` INTEGER NOT NULL,
    `id_prenda` INTEGER NOT NULL,
    `fechaCompra` DATETIME(3) NOT NULL,
    `nroCompra` INTEGER NOT NULL,
    `resena` VARCHAR(191) NULL,
    `nroTransacion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tiene` (
    `id_prenda` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_prenda`, `id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoriaToPrenda` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaToPrenda_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToPrenda_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dona` ADD CONSTRAINT `Dona_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dona` ADD CONSTRAINT `Dona_idArticulo_fkey` FOREIGN KEY (`idArticulo`) REFERENCES `Articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prenda` ADD CONSTRAINT `Prenda_id_vendedor_fkey` FOREIGN KEY (`id_vendedor`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_comprador_fkey` FOREIGN KEY (`id_comprador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_prenda_fkey` FOREIGN KEY (`id_prenda`) REFERENCES `Prenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vende` ADD CONSTRAINT `Vende_id_vendedor_fkey` FOREIGN KEY (`id_vendedor`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vende` ADD CONSTRAINT `Vende_id_prenda_fkey` FOREIGN KEY (`id_prenda`) REFERENCES `Prenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tiene` ADD CONSTRAINT `Tiene_id_prenda_fkey` FOREIGN KEY (`id_prenda`) REFERENCES `Prenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tiene` ADD CONSTRAINT `Tiene_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToPrenda` ADD CONSTRAINT `_CategoriaToPrenda_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToPrenda` ADD CONSTRAINT `_CategoriaToPrenda_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prenda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
