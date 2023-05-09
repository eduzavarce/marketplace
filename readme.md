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
         "status":"ok",
         "data": {
             "id":3,
             "avatar":"avatar.png",
             "name":"Rosita"
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
           "precio":299.99,
           "category":"console",
           "keywords":"consola Nintendo Zelda",
           "idUser":"6",
           "[locationName]":"Madrid, España" || "[location]":"41.0570167, 1.0284417",
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
        "[precio]":299.99,
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
    "id": "85",
    "url": "http://www.url.com/api/v1/products/:85"
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
    }
  ]
}
```

5. Detalles de un producto (público):

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
  "data"{
     "id":3,
     "sellerUsername":"Juanita44",
     "idProduct": 5
  }
}
```

- El vendedor recibe en un email un enlace para acceder a redactar la respuesta donde encontrará un formulario y enviarlo a...

2. Comunicación entre comprador y vendedor (autenticado):

POST http://www.url.com/api/v1/deals/:id

```Json
//Mensajes del vendedor
      {
        "message": "dirección y hora de entrega propuesta",
        "status":"approved || rejected || completed"
       }
//mensajes del comprador
      {
        "message": "aceptada / cancelada la reserva o propongo otra hora o sitio....",
        "status":"completed || cancelled || null"
       }

```

Respuesta esperada:

```json
//ejemplo respuesta
{
  "status": "ok",
  "message": "enviado email con respuesta al comprador",
  "data"{
     "id":3,
     "buyerUsername":"Pepito83",
     "idProduct": 5
  }
}
```

3. Valoración del proceso de compra-venta

POST http://www.url.com/api/v1/reviews/:idDeals (comprador o vendedor autenticados)

body:

```json
{
  "counterpartUsername": 5,

  "data"{
     "comment": "comentario de valoración de experiencia",
     "rating":"1-5",
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
