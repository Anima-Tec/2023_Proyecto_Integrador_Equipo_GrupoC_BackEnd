# RacconTZ-backend

# Instalación del Proyecto

## Requisitos previos

Asegurate de tener instalado "[Node.js](https://nodejs.org/en)"

----

## Pasos de instalación

1. _Clona el repositorio (Utilizando en la terminal "git clone `URL-del-repo`")_
2. _Accede al directorio del proyecto (Utilizando en la terminal `CD nombre-del-directorio`)_
3. _Crea un archivo con el nombre `.env` que contenga una variable llamada `PORT` y asignale un valor_
4. _En el archivo `.env` crea una variable llamada `DATABASE_URL` y como valor agregale tu servicio de base de dato_
5. _Utiliza el comando `npm install` para instalar todas las dependencias del proyecto_
6. _utiliza el comando `node app.js` para correr la aplicación_

## BDD - Prisma

En este proyecto se utiliza [Prisma](https://www.prisma.io/) como ORM Y aquí se mostrar el paso a paso de como configurarlo en su maquina local.

1. _Lo primero que debemos hacer es crear un archivo `.env` y crear un variable llamada `DATABASE_URL`_
2. _El siguiente paso sera colocarle un ese valor sera la url de nuestra base de datos (La URL varia dependiendo de nustro servicio de BDD)_
3. _Si utilizamos MySQL tendremos que utilizar el siguiente tipo de URL "mysql://`user-name`:`ùser-password`@`host`:`port`/`database-name`"_
4. _Una vez seteado la URL lo siguiente sera dirigirnos a la carpeta `prisma` para realizar el migrate_
5. _Estando adentro de esa carpete utilizaremos el siguiente comando `npx prisma generate`_
6. _Después de aver ejecutado ese comando ejecutaremos el siguiente comando `npx prisma migrate dev --name init`_
7. _Después de terminar este proceso confirmaremos que todo salio correctamente entrando en MySQL workbeanch y revisando si las tablas ser crearon correctamente_

Como se dijo en el paso "2." la URL dependera de que servicio de BDD que usemos a continuació hay ejemplos de otras URL
En este [LINK](https://www.prisma.io/docs/reference/database-reference/connection-urls) se encuetran las demás URL en prisma

_PostgreSQL: postgresql://`USER`:`` PASSWORD`@`HOST`:`PORT ``/`DATABASE-NAME`_
_MongoDB: mongodb://`USER`:`PASSWORD`@`HOST`/`DATABASE-NAME`_

(La veersión más estable esta en la rama Main y en develop hay agunos objetos que pueden genrear conflictos)

