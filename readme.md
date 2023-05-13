# Backend marketplace productos retro-gaming

## Descripción:

    Backend para plataforma de venta de artículos retro gaming nuevos o usados directamente entre usuarios......

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
     "data": {
       "id": "1",
       "testVerificationLink": "http://localhost:3000/api/vi/user/activate/code=[verificationCode]"
     }
   }
   ```

2. Verificación email usuarios registrados:

   GET http://www.url.com/api/v1/users/activate/:code

   Respuesta esperada:

   ```json
   {
     "status": "ok",
     "message": "Email verificado correctamente"
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
            "status":"ok",
            "data":{
                "accessToken": "eyJhfasdGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJQZXBpdasdgUMOhZXoiLCJlbWFpbCI6ImVkdXphdmFyY2UrMDVAZ21haWwuY29tIiwicm9sZSI6InJlYWRlciIsImVqZW1wbG8iOiJhc2RmIiwiaWF0IjoxNjgzNTg2NjQ3LCJleHAiOjE2ODM1OTc0NDd9.4i2wIjZGwEoEqewI8uDkH8yNw4Sz3OF6b549lY_mJlw",
                "expiresIn": "20m"
            }
        }
   ```

4. Editar cuenta del usuario autenticado:

   PATCH http://www.url.com/api/v1/users/:username/profile

   Body petición:

   ```Json
       {
           "[username]":"username",
           "[password]":"xxxx",
           "[repeatPassword]":"xxxx",
           "[name]":"name",
           "[lastName]":"last name/s",
           "[avatar]":"image.jpg",
           "[bio]":"texto información del usuario",
           "[address]":"Calle principal, 23, Madrid",
           "[region]":"Madrid",
           "[country]":"España"
       }
   ```

   Respuesta esperada:

   ```Json
        {
            "status":"ok",
            "message": "Datos actualizados correctamente"
        }
   ```

5. Datos del usuario (usuario autenticado)

GET http://www.url.com/api/v1/users/:username

Respuesta esperada:

```Json
    {
    "status": "ok",
    "data": {
        "userData": {
            "id": 15,
            "username": "johndoe",
            "name": "john",
            "lastName": "doe",
            "email": "johndoe@gmail.com",
            "avatar": "default-avatar.png",
            "createdAt": "2023-05-12T18:32:28.000Z",
            "isActive": 1,
            "role": "user",
            "bio": "tipo pesado",
            "region": "Tarragona",
            "country": "España",
            "address": "calle 4 cambirls"
        },
        "usersDealsHistory": [
            {
                "status": "requested",
                "idDeal": 3,
                "idBuyer": 15,
                "name": "ATARI",
                "idVendor": 1,
                "usernameVendor": "admin"
            },
            {
                "status": "requested",
                "idDeal": 4,
                "idBuyer": 15,
                "name": "ATARI",
                "idVendor": 1,
                "usernameVendor": "admin"
            },
            {
                "status": "requested",
                "idDeal": 5,
                "idBuyer": 15,
                "name": "NINTENDO",
                "idVendor": 4,
                "usernameVendor": "juanito"
            },
            {
                "status": "requested",
                "idDeal": 6,
                "idBuyer": 15,
                "name": "NINTENDO",
                "idVendor": 4,
                "usernameVendor": "juanito"
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
           "name":"nombre del producto",
           "description":"descripción del producto",
           "price":299.99,
           "category":"console",
           "keywords":"consola Nintendo Zelda",
           "idUser":"6",
           "address":"Madrid, España" || "[location]":"41.0570167, 1.0284417",
           "defaultPicture":"product.png",
           "status":"used || new || refurbished"
        }
   ```

   Respuesta esperada:

   ```json
   {
     "status": "ok",
     "data": {
       "id": "85",
       "url": "http://www.url.com/api/v1/products/:85"
     }
   }
   ```

2. Modificar productos existentes (solo propietario o admin):

PATCH http://www.url.com/api/v1/products/:85
Body petición:

```Json
    {
        "[name]":"nombre del producto",
        "[description]":"descripción del producto",
        "[price]":299.99,
        "[category]":"console",
        "[keywords]":"consola Nintendo Zelda",
        "[idUser]":"6",
        "[locationName]":"Madrid, España" || "[location]":"41.0570167, 1.0284417",
        "[defaultPicture]":"product.png",
        "[status]":"used || new || refurbished"
     }
```

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "id": "85",
    "url": "http://www.url.com/api/v1/products/:85"
  }
}
```

3. Agregar fotos del producto existente (solo propietario):

PUT http://www.url.com/api/v1/products/:85

```Json
      {
          "[image1]":"image1.jpg",
          "[image2]":"image2.png",
          "[image3]":"image3.webp",
          "[image4]":"image4.bmp",
          "[image5]":"image5.bmp",

       }
```

Respuesta esperada:

```json
{
  "status": "ok",
  "data": {
    "id": "1",
    "imageList": {
      "image 1": "http://localhost:3000/api/v1/products/1/HO4JY9UdfHQy.png",
      "image 2": "http://localhost:3000/api/v1/products/1/LDrmdssU4jzX.png"
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
  "data": [
    {
      "id": 85,
      "name": "nombre del producto",
      "description": "descripción del producto",
      "precio": 299.99,
      "category": "console",
      "keywords": "consola Nintendo Zelda",
      "locationName": "Madrid, España",
      "defaultPicture": "product.png",
      "url": "http://www.url.com/api/v1/products/:85",
      "status": "used"
    },
    {
      "id": 86,
      "name": "nombre del producto",
      "description": "descripción del producto",
      "precio": 299.99,
      "sellerName": "Pepita",
      "category": "console",
      "keywords": "consola Nintendo Zelda",
      "locationName": "Madrid, España",
      "defaultPicture": "product.png",
      "status": "used"
    },
    {
      "id": 87,
      "name": "nombre del producto",
      "description": "descripción del producto",
      "precio": 299.99,
      "sellerName": "Pepita",
      "category": "console",
      "keywords": "consola Nintendo Zelda",
      "locationName": "Madrid, España",
      "defaultPicture": "product.png",
      "status": "used"
    }
  ]
}
```

5. Detalles de un producto (público):

GET http://www.url.com/api/v1/products/:85

Respuesta esperada:

```json
{
  "status": "ok",
  "data": [
    {
      "id": 85,
      "name": "nombre del producto",
      "description": "descripción del producto",
      "precio": 299.99,
      "sellerName": "Pepita",
      "category": "console",
      "keywords": "consola Nintendo Zelda",
      "locationName": "Madrid, España",
      "defaultPicture": "product.png",
      "status": "used"
    }
  ]
}
```

### Proceso de reserva y venta:

1. Reserva de un producto (usuarios autenticados):
   - se reserva y se envía un mail al vendedor con el enlace para responder

POST http://www.url.com/api/v1/products/:idProduct

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "enviado email de petición de reserva del producto",
  "data": {
    "id": 41,
    "sellerUsername": 1,
    "productId": "3",
    "productName": "ATARI",
    "productPrice": "50.00",
    "productImages": [
      {
        "imageName": "image1.png",
        "imageUrl": "http://localhost:3000/api/v1/products/3/image1.png"
      },
      {
        "imageName": "image2.png",
        "imageUrl": "http://localhost:3000/api/v1/products/3/image2.png"
      },
      {
        "imageName": "image3.png",
        "imageUrl": "http://localhost:3000/api/v1/products/3/image3.png"
      },
      {
        "imageName": "image4.png",
        "imageUrl": "http://localhost:3000/api/v1/products/3/image4.png"
      }
    ],
    "productUrl": "http://localhost:3000/api/v1/products/3"
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
    "message": "Contenido del mensaje hasta 500 caracteres",
    "address":"Calle grande, 4, Ciudad ",
    "time": "2023-05-18T16:45",
    "status":"accepted" // Default accepted, el vendedor lo puede cambiar por "approved", "rejected" o "completed" en caso de ser completed recibirá un email con un link para valorar la venta
}
//mensajes del comprador
     {
    "message": "Contenido del mensaje hasta 500 caracteres",
    "address":"",
    "time": "",
    "status":"cancelled" // Default accepted, el vendedor lo puede cambiar por "approved", "cancelled" o "completed" en caso de ser completed recibirá un email con un link para valorar la venta
}

```

Respuesta esperada:

```json
//ejemplo respuesta
{
  "status": "ok",
  "sender": "comprador",
  "content": {
    "message": "Hola!, el ATARI tiene todos sus mandos?, ¿Cuándo podemos quedar?. Gracias!",
    "address": "",
    "time": "",
    "status": ""
  },
  "currentDealDetails": {
    "idProduct": 1,
    "nameProduct": "ATARI",
    "idVendor": 14,
    "usernameVendor": "janedoe",
    "emailVendor": "janedoe@gmail.com",
    "idBuyer": 15,
    "usernameBuyer": "johndoe",
    "emailBuyer": "johndoe@gmail.com",
    "statusDeal": "requested",
    "idDeal": 7
  },
  "messageLog": [
    {
      "id": 3,
      "idDeal": 7,
      "idSender": 15,
      "idRecipient": 14,
      "message": "Hola!, el ATARI tiene todos sus mandos?, ¿Cuándo podemos quedar?. Gracias!",
      "location": "",
      "proposedDate": null,
      "status": "requested",
      "createdAt": "2023-05-13T06:00:10.000Z"
    },
    {
      "id": 2,
      "idDeal": 7,
      "idSender": 15,
      "idRecipient": 14,
      "message": "Hola!, el ATARI tiene todos sus mandos?, ¿Cuándo podemos quedar?. Gracias!",
      "location": "",
      "proposedDate": null,
      "status": "requested",
      "createdAt": "2023-05-13T05:58:41.000Z"
    },
    {
      "id": 1,
      "idDeal": 7,
      "idSender": 15,
      "idRecipient": 14,
      "message": "Hola!, el ATARI tiene todos sus mandos?, ¿Cuándo podemos quedar?. Gracias!",
      "location": "",
      "proposedDate": null,
      "status": "requested",
      "createdAt": "2023-05-13T05:57:39.000Z"
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
  "data"{
     "rating":3,
     "comment":"comentario de valoración de experiencia",
  }
}
```
