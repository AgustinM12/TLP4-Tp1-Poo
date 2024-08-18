# Proyecto - Sistema de Ventas

## Instalación

1. Crear un archivo llamado `.env.development` en la carpeta raíz.
2. Sigue el archivo de ejemplo para definir las variables: puerto, URI de conexión a MongoDB, y una clave secreta.

## Ejecutar el Proyecto

En una terminal, navega hasta la carpeta raíz del proyecto y ejecuta el siguiente comando:

```bash
npm run dev



###MODULO DE USUARIOS:

GET
Buscar todos los usuarios por su rol (CLIENT o SELLER):

GET http://localhost:{PORT}/api/userRole/{role}


Buscar usuario por ID:
GET http://localhost:{PORT}/api/user/{id}



Buscar usuario por nombre o email:
GET http://localhost:{PORT}/api/userNameEmail


POST:
Crear cliente
POST http://localhost:{PORT}/api/client


Crear vendedor
POST http://localhost:{PORT}/api/seller

Login
POST http://localhost:{PORT}/api/login


DELETE:
Eliminar usuario:
DELETE http://localhost:{PORT}/api/user/{id}


###MODULO DE PRODUCTOS:

GET:
Buscar todos los productos 
GET http://localhost:{PORT}/api/products


Buscar productos por ID 
GET ttp://localhost:{PORT}/api/product/{id del producto}

Buscar productos por nombre
GET http://localhost:{PORT}/api/product

POST:
Crear producto 
POST http://localhost:{PORT}/api/product


PUT:
Actualizar producto 
PUT http://localhost:{PORT}/api/product/{id del producto}


DELETE:
Eliminar producto:
DELETE http://localhost:{PORT}/api/product/{id del producto}


###MODULO DE VENTAS:
GET:

Buscar todas las ventas
GET http://localhost:{PORT}/api/sales


Buscar venta por ID
GET http://localhost:{PORT}/api/sale/{id venta}


Buscar todas las ventas por fecha
GET http://localhost:{PORT}/api/saleDate


Buscar todas las ventas por usuario
GET http://localhost:{PORT}/api/saleByUser/{id vendedor}


POST:
Crear venta
POST http://localhost:{PORT}/api/sale
