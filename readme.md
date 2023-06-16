# Backend marketplace productos retro-gaming

## Descripción:

    Backend para plataforma de venta de artículos retro gaming nuevos o usados directamente entre usuarios......

## Configuración inicial:

1. Para crear la base de datos:

```bash
npm run createDatabase
```

2. Para insertar algunos datos de usuarios, productos, etc:

```bash
npm run fillDatabase
```

3.  Archivos de configuración Postman en `/docs/postman`, hay uno de enviroments para grabar la url y el access token automáticamente cuando se hace login.

## Endpoints

### Usuarios:

1. Registro usuarios nuevos

   POST http://www.url.com/api/v1/users/register

   Body petición:

   ```Json
       {
           "username":"username",
           "email":"email@something.com",
           "password":"xxxx",
           "repeatPassword":"xxxx"
       }
   ```

   Respuesta esperada:

   ```json
   {
     "status": "ok",
     "message": "verification email sent",
     "data": {
       "id": 13,
       "username": "username"
     }
   }
   ```

2. Verificación email usuarios registrados:

   GET http://www.url.com/api/v1/users/activate/:code

   Respuesta esperada:

   ```json
   {
     "status": "ok",
     "message": "Email verificado correctamente",
     "profileUrl": "http://localhost:3000/users/private/userneame (url para editar perfil en el navegador, no existe aun)"
   }
   ```

3. Login usuarios registrados:

   POST http://www.url.com/api/v1/users/login

   Body petición:

   ```Json
       {
           "username":"username",
           "password":"xxxx"
       }
   ```

   Respuesta esperada:

   ```Json
       {
    "status": "ok",
    "data": {
        "username": "vendedor",
        "avatar": "http://localhost:3000/users/3/3_gSVcOV5W8N6P.png",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkdXphdmFyY2UrMkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjozLCJ1c2VybmFtZSI6InZlbmRlZG9yIiwibmFtZSI6IkVkdWFyZG8iLCJpYXQiOjE2ODY3NzcxNTUsImV4cCI6MTcxODMzNDc1NX0.EPa9rueAzH6_rLgoGBANT6Vhfhs09vCKO08UWLbz7Jw",
        "expiresIn": "1y"
        }
      }
   ```

4. Editar cuenta del usuario autenticado:

   PATCH http://www.url.com/api/v1/users/:username/profile

   Body petición:

   ```Json
       {
      "[name]" : "John",
      "[lastname]": "Doe",
      "[password]": "asdasd",
      "[repeatPassword]":"asdasd",
      "[bio]":"warrior@hackaboss",
      "[country]":"españa",
      "[region]":"cataluña",
       "[address]":"",
       "[city]":"barcelona",
       "[avatar]":"{file.png}"
    }
   ```

   Respuesta esperada:

   ```Json
      {
    "status": "ok",
    "data": {
        "id": 3,
        "username": "username",
        "name": "John",
        "lastName": "Doe",
        "email": "something2@gmail.com",
        "avatar": "3_wZAdHT9mHVhi.png",
        "createdAt": "2023-05-09T18:28:35.000Z",
        "isActive": 1,
        "role": "user",
        "bio": "warrior@hackaboss",
        "address": null,
        "city": "barcelona",
        "region": "cataluña",
        "country": "españa",
        "locationLat": null,
        "locationLong": null,
        "avatarUrl": "http://localhost:3000/users/3/3_wZAdHT9mHVhi.png"
    }
   }
   ```

5. Datos del usuario (usuario autenticado)

GET http://www.url.com/api/v1/users/private/

Respuesta esperada:

```Json
    {
    "status": "ok",
    "data": {
        "userData": {
            "id": 3,
            "username": "vendedor",
            "name": "John",
            "lastName": "Doe",
            "email": "something@gmail.com",
            "avatar": "3_wZAdHT9mHVhi.png",
            "createdAt": "2023-05-09T18:28:35.000Z",
            "isActive": 1,
            "role": "user",
            "bio": "warrior@hackaboss",
            "address": null,
            "city": "barcelona",
            "region": "cataluña",
            "country": "españa",
            "locationLat": null,
            "locationLong": null,
            "avgScore": "4.2500",
            "avatarUrl": "http://localhost:3000/users/3/3_wZAdHT9mHVhi.png"
        },
        "products": [
            {
                "id": 1,
                "name": "ATARI",
                "description": "ATARI 2600",
                "price": "50.00",
                "category": "games",
                "keywords": "CONSOLA PACMAN GALAXY",
                "status": "new",
                "isActive": 0,
                "city": "zaragoza",
                "images": []
            },
            {
                "id": 2,
                "name": "ATARI",
                "description": "ATARI 2600",
                "price": "50.00",
                "category": "games",
                "keywords": "CONSOLA PACMAN GALAXY",
                "status": "new",
                "isActive": 0,
                "city": "madrid",
                "images": []
            },
        ],
        "dealsHistory": [
            {
                "status": "requested",
                "idDeal": 4,
                "idBuyer": 8,
                "name": "sega",
                "idVendor": 3,
                "usernameVendor": "vendedor"
            },
            {
                "status": "completed",
                "idDeal": 1,
                "idBuyer": 8,
                "name": "ATARI",
                "idVendor": 3,
                "usernameVendor": "vendedor"
            }
        ],
        "chatHistory": []
    }
}
```

6. Datos de otro usuario

GET http://www.url.com/api/v1/users/:username

Respuesta esperada:

```Json
    {
    "status": "ok",
    "data": {
        "userData": {
            "username": "vendedor",
            "avatar": null,
            "bio": null,
            "avgScore": "4.0000",
            "avatarUrl": "http://localhost:3000/users/default-avatar.png"
        },
        "products": [
            {
                "id": 4,
                "name": "NINTENDO",
                "description": "NES",
                "price": "70.00",
                "category": "consoles",
                "keywords": "mario zelda nes contra",
                "status": "used",
                "isActive": 1,
                "city": "madrid",
                "images": []
            }
        ]
    }
}
```

### Productos:

1. Agregar productos nuevos

   POST http://www.url.com/api/v1/products/create

   Body petición:

   ```Json
       {
        "name":"NES Nintendo original",
        "description":"Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
        "price":299.99,
        "category":"consoles",
        "keywords":"consola Nintendo Zelda",
        "address":"",
        "region":"",
        "country":"",
        "city":"barcelona",
        "status":"used"
     }
   ```

   Respuesta esperada:

   ```json
   {
     "status": "ok",
     "data": {
       "productInfo": {
         "id": 16,
         "name": "NES Nintendo original",
         "description": "Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
         "price": "299.99",
         "category": "consoles",
         "keywords": "consola Nintendo Zelda",
         "idUser": 3,
         "createdAt": "2023-05-14T20:28:36.000Z",
         "updatedAt": null,
         "isActive": 1,
         "address": "",
         "city": "coruña",
         "region": "",
         "country": "",
         "locationLat": null,
         "locationLong": null,
         "status": "used"
       },
       "url": "http://localhost:3000/api/v1/products/16",
       "uploadImagesUrl": "http://localhost:3000/api/v1/products/16"
     }
   }
   ```

2. Modificar productos existentes (solo propietario o admin):

PATCH http://www.url.com/api/v1/products/:85
Body petición:

```Json
    {
        "name":"NES Nintendo original",
        "description":"Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
        "price":299.99,
        "category":"consoles",
        "keywords":"consola Nintendo Zelda",
        "country":"españa",
        "region":"",
        "address":"",
        "city":"coruña",
        "status":"refurbished"
     }
```

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "id": 8,
    "name": 8,
    "description": "Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
    "price": "299.99",
    "category": "consoles",
    "url": "localhost:3000/api/vi/products/3",
    "pictures": [
      "http://localhost:3000/products/8/8_TqG2nAH5Jyys.png",
      "http://localhost:3000/products/8/8_VtnntHAj4XCg.png",
      "http://localhost:3000/products/8/8_L0WmOSL73j8a.png",
      "http://localhost:3000/products/8/8_RmxLpFSCeyWr.png",
      "http://localhost:3000/products/8/8_OoVc3FXwUDmG.png",
      "http://localhost:3000/products/8/8_QAZosS8uwAd6.png",
      "http://localhost:3000/products/8/8_MeJGf0MgPyTB.png",
      "http://localhost:3000/products/8/8_afsGOE5JARN2.png",
      "http://localhost:3000/products/8/8_dYRsJqK2DAny.png"
    ]
  }
}
```

3. Agregar fotos del producto existente (solo propietario):

PUT http://www.url.com/api/v1/products/:85

```Json
  //se introducen en formdata con el key "images, maximo 10 fotos"
      {
          "images":["image1.jpg","image2.png","image3.webp","image4.bmp","image5.bmp"]
       }
```

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "id": "7",
    "imageList": {
      "image 1": "http://localhost:3000/api/v1/products/7/7_np7DAUbD4xii.png",
      "image 2": "http://localhost:3000/api/v1/products/7/7_HOoopAuqOVPk.png",
      "image 3": "http://localhost:3000/api/v1/products/7/7_QmDL59oElLjJ.png",
      "image 4": "http://localhost:3000/api/v1/products/7/7_uULMkEUznrEf.png",
      "image 5": "http://localhost:3000/api/v1/products/7/7_Y3IecEueg3tP.png"
    }
  }
}
```

4. Listar todos los productos (público):

GET http://www.url.com/api/v1/products/

Respuesta esperada:

```json
{
  "status": "ok",
  "products": [
    {
      "id": 1,
      "name": "ATARI",
      "description": "ATARI 2600",
      "price": "50.00",
      "category": "games",
      "keywords": "CONSOLA PACMAN GALAXY",
      "idUser": 3,
      "createdAt": "2023-05-14T14:48:34.000Z",
      "updatedAt": null,
      "isActive": 0,
      "address": null,
      "city": "zaragoza",
      "region": null,
      "country": null,
      "locationLat": null,
      "locationLong": null,
      "status": "new",
      "images": []
    },
    {
      "id": 8,
      "name": "NES Nintendo original",
      "description": "Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
      "price": "299.99",
      "category": "consoles",
      "keywords": "consola Nintendo Zelda",
      "idUser": 3,
      "createdAt": "2023-05-14T17:25:14.000Z",
      "updatedAt": null,
      "isActive": 1,
      "address": null,
      "city": "coruña",
      "region": null,
      "country": "spain",
      "locationLat": "40.968136",
      "locationLong": "-5.662155",
      "status": "used",
      "images": [
        "http://localhost:3000/products/8/8_TqG2nAH5Jyys.png",
        "http://localhost:3000/products/8/8_VtnntHAj4XCg.png",
        "http://localhost:3000/products/8/8_L0WmOSL73j8a.png",
        "http://localhost:3000/products/8/8_RmxLpFSCeyWr.png",
        "http://localhost:3000/products/8/8_OoVc3FXwUDmG.png",
        "http://localhost:3000/products/8/8_QAZosS8uwAd6.png",
        "http://localhost:3000/products/8/8_MeJGf0MgPyTB.png",
        "http://localhost:3000/products/8/8_afsGOE5JARN2.png",
        "http://localhost:3000/products/8/8_dYRsJqK2DAny.png"
      ]
    }
  ]
}
```

5. Listar todos los productos por nombre (público):
   GET http://www.url.com/api/v1/products/search/?name=nintendo

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "products": [
      {
        "id": 4,
        "name": "NINTENDO",
        "description": "NES",
        "price": "70.00",
        "category": "consoles",
        "keywords": "mario zelda nes contra",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 1,
        "address": "Barcelona, España",
        "city": "madrid",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "used"
      },
      {
        "id": 5,
        "name": "NES Nintendo original",
        "description": "Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
        "price": "299.99",
        "category": "consoles",
        "keywords": "consola Nintendo Zelda",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 1,
        "address": "zaragoza",
        "city": "coruña",
        "region": null,
        "country": "españa",
        "locationLat": null,
        "locationLong": null,
        "status": "refurbished"
      }
    ]
  }
}
```

6. Listar todos los productos por categoría (público):

GET http://www.url.com/api/v1/products/search/?category=consoles

Categorías válidas:

'consoles', 'games', 'PC', 'cloth', 'controllers', 'arcade'

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "products": [
      {
        "id": 4,
        "name": "NINTENDO",
        "description": "NES",
        "price": "70.00",
        "category": "consoles",
        "keywords": "mario zelda nes contra",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 1,
        "address": "Barcelona, España",
        "city": "madrid",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "used"
      },
      {
        "id": 5,
        "name": "NES Nintendo original",
        "description": "Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
        "price": "299.99",
        "category": "consoles",
        "keywords": "consola Nintendo Zelda",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 1,
        "address": "zaragoza",
        "city": "coruña",
        "region": null,
        "country": "españa",
        "locationLat": null,
        "locationLong": null,
        "status": "refurbished"
      }
    ]
  }
}
```

7. Listar todos los productos por localidad (público):

GET http://www.url.com/api/v1/products/search/?location=madrid

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "products": [
      {
        "id": 2,
        "name": "ATARI",
        "description": "ATARI 2600",
        "price": "50.00",
        "category": "games",
        "keywords": "CONSOLA PACMAN GALAXY",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 0,
        "address": "Madrid, España",
        "city": "madrid",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "new"
      },
      {
        "id": 4,
        "name": "NINTENDO",
        "description": "NES",
        "price": "70.00",
        "category": "consoles",
        "keywords": "mario zelda nes contra",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 1,
        "address": "Barcelona, España",
        "city": "madrid",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "used"
      }
    ]
  }
}
```

8. Listar todos los productos por precio (público):

GET http://www.url.com/api/v1/products/search/?price=ASC

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "products": [
      {
        "id": 3,
        "name": "ATARI",
        "description": "ATARI 2600",
        "price": "50.00",
        "category": "games",
        "keywords": "CONSOLA PACMAN GALAXY",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 0,
        "address": "Madrid, España",
        "city": "zaragoza",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "new"
      },
      {
        "id": 7,
        "name": "sega",
        "description": "sega genesis",
        "price": "60.00",
        "category": "consoles",
        "keywords": "sonic sega",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 0,
        "address": "Valencia",
        "city": "barcelona",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "refurbished"
      },
      {
        "id": 4,
        "name": "NINTENDO",
        "description": "NES",
        "price": "70.00",
        "category": "consoles",
        "keywords": "mario zelda nes contra",
        "idUser": 3,
        "createdAt": "2023-05-14T14:48:34.000Z",
        "updatedAt": null,
        "isActive": 1,
        "address": "Barcelona, España",
        "city": "madrid",
        "region": null,
        "country": null,
        "locationLat": null,
        "locationLong": null,
        "status": "used"
      }
    ]
  }
}
```

9. Detalles de un producto (público):

GET http://www.url.com/api/v1/products/:85

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "id": 8,
    "name": "NES Nintendo original",
    "description": "Consola original Nintendo NES con controles, pistola y alfombra. todo en buen estado!",
    "city": "madrid",
    "price": "299.99",
    "category": "consoles",
    "vendorInfo": {
      "username": "vendedor",
      "profileUrl": "http://localhost:3000/api/v1/users/vendedor",
      "avgScore": "4.0000"
    },
    "url": "localhost:3000/api/vi/products/8",
    "pictures": [
      "http://localhost:3000/products/8/8_TqG2nAH5Jyys.png",
      "http://localhost:3000/products/8/8_VtnntHAj4XCg.png",
      "http://localhost:3000/products/8/8_L0WmOSL73j8a.png",
      "http://localhost:3000/products/8/8_RmxLpFSCeyWr.png",
      "http://localhost:3000/products/8/8_OoVc3FXwUDmG.png",
      "http://localhost:3000/products/8/8_QAZosS8uwAd6.png",
      "http://localhost:3000/products/8/8_MeJGf0MgPyTB.png",
      "http://localhost:3000/products/8/8_afsGOE5JARN2.png",
      "http://localhost:3000/products/8/8_dYRsJqK2DAny.png"
    ]
  }
}
```

### Proceso de reserva y venta:

1. Reserva de un producto (usuarios autenticados):
   - se reserva y se envía un mail al vendedor con el enlace para responder

POST http://www.url.com/api/v1/products/:idProduct

Respuesta esperada si el producto ya está reservado:

```json
{
  "status": "error",
  "code": 403,
  "error": "Producto no disponible"
}
```

Respuesta esperada si el producto está disponible:

```json
{
  "status": "ok",
  "message": "enviado emails donde comprador y vendedor se pueden comunicar y cambiar el estado de la venta",
  "data": {
    "id": 6,
    "productName": "NES Nintendo original",
    "productUrl": "http://localhost:3000/api/v1/products/9"
  }
}
```

- El vendedor recibe en un email un enlace para acceder a redactar la respuesta donde encontrará un formulario y enviarlo a...

2. Comunicación entre comprador y vendedor (autenticado):

POST http://www.url.com/api/v1/deals/:id

Tanto el comprador como el vendedor pueden dejar campos en blanco (como "")si no los quieren modificar

```Json
//Mensajes del vendedor
{
    "message": "mensaje de respuesta, propongo entrega la direccion x le lunes 15 a las 16:30",
    "address":"C/ Gran Vía, 32, 28013 Madrid",
    "time": "2023-05-18T18:00",
    "status":"completed"
}
//status validos: "approved", "rejected" "completed", "" para no modificar
{
    "message": "yo lo queria para hoy tio, gracias",
    "address":"",
    "time": "",
    "status":""
}
//status validos: "cancelled", "completed", "" para no modificar

```

Respuesta esperada:

```json
//ejemplo respuesta
{
  "status": "ok",
  "sender": "comprador",
  "content": {
    "message": "yo lo queria para hoy tio, gracias",
    "address": "",
    "time": "",
    "status": "cancelled"
  },
  "currentDealDetails": {
    "idProduct": 9,
    "nameProduct": "NES Nintendo original",
    "idVendor": 3,
    "usernameVendor": "vendedor",
    "emailVendor": "eduzavarce+2@gmail.com",
    "idBuyer": 8,
    "usernameBuyer": "comprador",
    "emailBuyer": "eduzavarce+7@gmail.com",
    "statusDeal": "cancelled",
    "idDeal": 6
  },
  "messageLog": [
    {
      "id": 1,
      "idDeal": 6,
      "idSender": 8,
      "idRecipient": 3,
      "message": "yo lo queria para hoy tio, gracias",
      "location": "",
      "proposedDate": null,
      "status": "cancelled",
      "createdAt": "2023-05-14T20:42:46.000Z"
    }
  ]
}
```

3. Valoración entre comprador y vendedor

POST http://www.url.com/api/v1/reviews/:idDeal (comprador o vendedor autenticados)

El comentario es opcional y puede contener hasta 255 caracteres
La puntuación es un número entero entre 1 y 5.

body:

```json
{
  {
     "comment": "comentario de valoración de experiencia",
     "rating":5,
    }
}
```

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "reviewer": "comprador",
    "vendor": "vendedor",
    "score": 5
  }
}
```
