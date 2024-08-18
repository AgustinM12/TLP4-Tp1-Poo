COMO INSTALAR:

crear un archivo llamado ".env.development" en la carpeta raiz siguiendo el archivo de ejemplo con el puerto, URI de conexion a MONGODB y una clave secreta.

EJECUTAR EL PROYECTO:
en una terminar navegar hasta la carpeta raiz del proyecto y ejecutar el comando "npm run dev"

MODULO DE USUARIOS:

GET:
Buscar todos los usuarios por su rol (CLIENT o SELLER):
http://localhost:{PORT}/api/user/{role} 

Buscar usuario por ID:
http://localhost:{PORT}/api/user/{id}

Buscar usuario por nombre o email:
http://localhost:{PORT}/api/userNameEmail

POST:
Crear cliente
http://localhost:{PORT}/api/client

Crear vendedor
http://localhost:{PORT}/api/seller

Login
http://localhost:{PORT}/api/login

DELETE:
Eliminar usuairo:
http://localhost:{PORT}/api/user/{id}

MODULO DE PRODUCTOS:

GET:
Buscar todos los productos 
http://localhost:{PORT}/api/products/{idAdmin o idSeller}

Buscar productos por ID 
http://localhost:{PORT}/api/products/{idAdmin o idSeller}

POST:
Crear producto 
http://localhost:{PORT}/api/product

PUT:
Actualizar producto 
http://localhost:{PORT}/api/product/{id del producto}

DELETE:
Eliminar producto:
http://localhost:{PORT}/api/product/{id del producto}

MODULO DE VENTAS:
GET:

Buscar todas las ventas
http://localhost:{PORT}/api/sales/{id Admin o id seller}

Buscar venta por ID
http://localhost:{PORT}/api/sale/{id venta}

Buscar todas las ventas por fecha
http://localhost:{PORT}/api/saleDate

Buscar todas las ventas por usuario
http://localhost:{PORT}/api/saleByUser

POST:
Crear venta
http://localhost:{PORT}/api/sale