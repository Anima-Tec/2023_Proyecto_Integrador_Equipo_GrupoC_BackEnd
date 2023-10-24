# RacconTZ-backend

# Instalación del Proyecto

## Requisitos previos

Asegurese de tener instalado "[Node.js](https://nodejs.org/en)"

----

## Pasos de instalación

1. _Clona el repositorio (Utilizando en la terminal "git clone `URL-del-repo`")_
2. _Accede al directorio del proyecto (Utilizando en la terminal `CD nombre-del-directorio`)_
3. _Crea un archivo con el nombre `.env` que contenga una variable llamada `PORT` y asignale un valor_
4. _En el archivo `.env` crea una variable llamada `DATABASE_URL` y como valor agregale tu servicio de BDD_
5. _En el archivo `.env` crea otra variable llamada `JWT_ACCESS_SECRET`_
5. _Utiliza el comando `npm install` para instalar todas las dependencias del proyecto_
6. _utiliza el comando `node app.js` para correr la aplicación_

-----

## BDD - Prisma

-----

En este proyecto se utiliza [Prisma](https://www.prisma.io/) como ORM Y aquí se mostrara el paso a paso de como configurarlo en su maquina local.

1. _Lo primero que debemos hacer es crear un archivo `.env` y crear un variable llamada `DATABASE_URL`_
2. _El siguiente paso sera colocarle un valor, ese valor sera la url de nuestra base de datos (La URL varia dependiendo de nustro servicio de BDD)_
3. _En este proyecto usamos MySQL, en este caso tendremos que utilizar el siguiente tipo de URL "mysql://`user-name`:`ùser-password`@`host`:`port`/`database-name`"_
5. _Estando adentro de esa carpete utilizaremos el siguiente comando `npx prisma generate`_
6. _Después de ejecutar ese comando ejecutaremos el siguiente comando `npx prisma db push`_
7. _Después de terminar este proceso confirmaremos que todo salio correctamente entrando en MySQL workbeanch, revisaremos si la database y sus tablas se crearon correctamente_
8. _Dentro de MySQL workbeanch usaremos los siguientes inserts `
use "nombre-de-la-DB"
INSERT INTO Categoria (id,nombre) VALUES (1,'remeras');
INSERT INTO Categoria (id,nombre) VALUES (2,'camisas');
INSERT INTO Categoria (id,nombre) VALUES (3,'buzos');
INSERT INTO Categoria (id,nombre) VALUES (4,'camperas y abrigos');
INSERT INTO Categoria (id,nombre) VALUES (5,'pantalones');
INSERT INTO Categoria (id,nombre) VALUES (6,'shorts');
INSERT INTO Categoria (id,nombre) VALUES (7,'jeans');
INSERT INTO Categoria (id,nombre) VALUES (8,'pijamas');
INSERT INTO Categoria (id,nombre) VALUES (9,'vestidos');
INSERT INTO Categoria (id,nombre) VALUES (10,'faldas y polleras');`_

Como se dijo en el paso "2." la URL dependera de que servicio de BDD que usemos a continuación hay ejemplos de otras URL.
En este [LINK](https://www.prisma.io/docs/reference/database-reference/connection-urls) se encuetran las demás URL en prisma.
Cabe resaltar que este proyecto esta utilizando el lenguaje de MySQL, si utiliza otro servicio tendra que hacer un migrate

_PostgreSQL: postgresql://`USER`:`` PASSWORD`@`HOST`:`PORT ``/`DATABASE-NAME`_
_MongoDB: mongodb://`USER`:`PASSWORD`@`HOST`/`DATABASE-NAME`_


-----
## Deploy en producción
-----
1. _Para empezar con el deploy a producción ya deberian estar realizado los paso de instalación_
2. _En el archivo `.env` deberemos crear una variable llamada `NODE_ENV` a la misma le asignaremos el valor de `production`_
3. _Después dentro de la carpeta prisma usaremos el comando `npx prisma migrate deploy`_
4. _Después de haber realizado el comando volveremos a la carpeta del proyecto y utilizaremos el comando `NODE_ENV=production node app.js`_

