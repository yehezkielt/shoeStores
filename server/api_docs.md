# API Documentation

## Models :

_User_

- username : string (optional)
- email : string, unique (required)
- password : string (required)
- role: string (default: staff)
- phoneNumber: string
- address: string

_Category_

- name : string (required)

_Shoes_

- name : string (required)
- description : string (required)
- price : string (required)
- image : string
- stock : integer
- quantity : integer
- categoryId : integer (required)
- authorId : integer (required)

## Relationship :

### **Many-to-Many**

## Endpoints :

List of available endpoints:
​

- `POST /register`
- `POST /login`
- `POST /category/`
- `GET /category/`
- `PUT /category/:id`
- `DELETE /category/:id`
- `POST /shoes`
- `GET /shoes`
- `GET /shoes/:id`
- `PUT /shoes/:id`
- `DELETE /shoes/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "kemal2",
  "email": "kemal2@gmail.com",
  "password": "user2",
  "phoneNumber": "081275628563",
  "address": "Depok"
}
```

_Response (201 - Created)_

```json
{
  "id": 2,
  "username": "kemal",
  "email": "kemal@gmail.com"
}
```

_Response (400 - Bad Request)_



&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "kemal@gmail.com",
  "password": "kemal1"
}
```

_Response (200 - OK)_
​

```json
{
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5MzUzNzY3fQ.da0pTSAJJYEIwomoMEH-fVbj3y9vdtBXBYrhJMdVVpY"

}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

&nbsp;

## 3. POST /category

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "sneakers"
}
```

_Response (201 - Created)_
​

```json
{
  "id": 1,
  "name": "sneakers",
  "updatedAt": "2024-04-19 11:27:36.693 +0700",
  "createdAt": "2024-04-19 11:27:36.693 +0700"
}
```

&nbsp;

## 4. GET /category

Description: Get all categories

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "sneakers",
    "updatedAt": "2024-04-19 11:27:36.693 +0700",
    "createdAt": "2024-04-19 11:27:36.693 +0700"
  }
]
```

&nbsp;

## 5. PUT /categories/:id

Description: Update specific category based on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "INTEGER (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "Success updated {category.name}"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "NotFound"
}
```


&nbsp;

## 6. DELETE /category/:id

Description: Delete specific category based on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "INTEGER (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "{category.name}, has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "NotFound"
}
```

&nbsp;

## 7. POST /shoes

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
      "id": 20,
      "name": "Future Rider International Game Shoes",
      "price": "171",
      "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
      "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
    }
```

_Response (201 - Created)_
​

```json
{
  "message": "Success added {shoes.name}'s shoes"
}
```


&nbsp;

## 8. GET /shoes

Description: Get all shoes

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
   {
      "id": 20,
      "name": "Future Rider International Game Shoes",
      "price": "171",
      "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
      "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
      "size": 41,
      "quantity": 1
    },{
      "id": 19,
      "name": "Future Rider International Game Shoes",
      "price": "171",
      "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
      "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
      "size": 41,
      "quantity": 1
    }
]
```

&nbsp;

## 9. GET /shoes/:id

Description: Get specific product based on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  {
      "id": 20,
      "name": "Future Rider International Game Shoes",
      "price": "171",
      "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
      "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
      "size": 41,
      "quantity": 1
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "id_not_found"
}
```

&nbsp;

## 10. PUT /shoes/:id

Description: Update specific product based on id (Admin can update all shoes while staff can only update their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "admin"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "message": "Success updated ${shoes.name}'s shoes"
}
```

_Response (200 - OK)_

```json
{

    "id": 20,
    "name": "Future Rider International Game Shoes",
    "price": "171",
    "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
    "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family.",
    "size": 41,
    "quantity": 1,
    "createdAt": "2024-03-02T04:27:36.696Z",
    "updatedAt": "2024-03-02T04:29:41.696Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "id_not_found"
}
```


&nbsp;

## 11. DELETE /shoes/:id

Description: Delete specific product based on id (Admin can delete all shoes while staff can only delete their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "admin"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "${shoes.name}, has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "id_not_found"
}
```

&nbsp;

## Global Error

_Response (401 - JsonWebTokenError)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
