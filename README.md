# AK Shop - Ecommerce

## Getting Started

Install packages

```
$ npm i
```

Start Server

- Development
  ```
  $ npm run dev
  ```
- Production

  ```

  ```

## Routes

### 1. Authentication

#### Sign Up

```
/api/<version>/access/sign-up
```

- Method: POST
- HEADER:
  - x-api-key
- Body:
  
  JSON
  ```json
  {
    "lastName": "",
    "firstName": "",
    "username": "",
    "password": ""
  }
  ```

#### Sign In

```
/api/<version>/access/sign-in
```

- Method: POST
- HEADER:
  - x-api-key
- Body:
  
  JSON
  ```json
  {
    "username": ,
    "password":
  }
  ```
  

#### Refresh Token

```
/api/v1/access/refresh-token
```

- Method: POST
- HEADER:
  - x-api-key
  - x-client-id
  - authorization
  - x-refresh-token
- Body: none

#### Sign Out

```
/api/<version>/access/sign-out
```

- Method: POST
- HEADER:
  - x-api-key
  - x-client-id
  - authorization
- Body: none

### 2. Shop

#### Create Shop

```
/api/<version>/shops
```

- Method: POST
- Header: x-api-key, x-client-id, authorization
- Body:
  
  JSON
  ```json
  {
    "name":
  }
  ```

### 3. Product

#### For Shop

##### Get all draft products

```
/api/<version>/products/draft/all
```

- Method: GET
- Header:
  - x-api-key
  - x-client-id
  - authorization
  - x-shop-id
- Body: none

##### Get all published products

```
 /api/<version>/products/published/all
```

- Method: GET
- Header:
  - x-api-key
  - x-client-id
  - authorization
  - x-shop-id
- Body: none

##### Create products

```
 /api/<version>/products
```

- Method: POST
- Header:
  - x-api-key
  - x-client-id
  - authorization
  - x-shop-id
- Body:
  JSON
  ```json
  {
    "name": "",
    "thumb": "",
    "description": "",
    "price": ,
    "quantity": ,
    "type": "",
    "variations": [],
    "attributes": 
  }
  ```
    Attributes field format by product type
    - Electronic

      ``` json
      "attributes": {
        "manufacture": "",
        "model": "",
        "color": ""
      }
      ``` 

    - Clothing:

      ``` json
      "attributes": {
        "brand": "",
        "size": "",
        "material": ""
      }
      ```

  Specific description
  | Field       | Type   | Required | Min | Max | Min Length | Max Length | Possible Values        |
  | ----------- | ------ | :------: | --: | --: | ---------: | ---------: | ---------------------- |
  | name        | string |    x     |     |     |            |            |                        |
  | thumb       | string |    x     |     |     |            |            |                        |
  | description | string |    x     |     |     |            |            |                        |
  | price       | number |    x     |   0 |     |            |            |                        |
  | quantity    | number |    x     |   0 |     |            |            |                        |
  | type        | string |    x     |     |     |            |            | Electronic, Clothing   |
  | variations  | array  |          |     |     |            |            |                        |
  | attributes  | mixed  |    x     |     |     |            |            | Format by product type |

  Product Type: Electronic
  | Field       | Type   | Required | Min | Max | Min Length | Max Length | Possible Values        |
  | ----------- | ------ | :------: | --: | --: | ---------: | ---------: | ---------------------- |
  | manufacture | string |    x     |     |     |            |            |                        |
  | model       | string |          |     |     |            |            |                        |
  | color       | string |          |     |     |            |            |                        |

  Product Type: Clothing
  | Field       | Type   | Required | Min | Max | Min Length | Max Length | Possible Values        |
  | ----------- | ------ | :------: | --: | --: | ---------: | ---------: | ---------------------- |
  | brand       | string |    x     |     |     |            |            |                        |
  | size        | string |          |     |     |            |            |                        |
  | material    | string |          |     |     |            |            |                        |
  
##### Publish product

  ```
  /api/<version>/products/publish/<productId>
  ```

  - Method: POST
  - HEADER:
    - x-api-key
    - x-client-id
    - authorization
    - x-shop-id
  - Body: none

##### UnPublish product

  ```
  /api/<version>/products/unpublish/<productId>
  ```
  
  - Method: POST
  - HEADER:
    - x-api-key
    - x-client-id
    - authorization
    - x-shop-id
  - Body: none

##### Update product

  ```
  /api/<version>/products/<productId>?type=<productType>
  ```

  - Method: PATCH
  - HEADER:
    - x-api-key
    - x-client-id
    - authorization
    - x-shop-id
  - Body: json, fields of the product

#### For Buyer

> Copyright © 2023 by Doan Anh Kiet
