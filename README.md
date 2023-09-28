# AK Shop API - Ecommerce

## Table Of Contents
- [AK Shop API - Ecommerce](#ak-shop-api---ecommerce)
  - [Table Of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [APIs](#apis)
    - [0. Options for Plural APIs](#0-options-for-plural-apis)
      - [Filter](#filter)
      - [Select fields](#select-fields)
      - [Paginate](#paginate)
      - [Sort](#sort)
      - [Full text search](#full-text-search)
    - [1. Authentication](#1-authentication)
      - [Sign Up](#sign-up)
      - [Sign In](#sign-in)
      - [Refresh Token](#refresh-token)
      - [Sign Out](#sign-out)
    - [2. Shop](#2-shop)
      - [Create Shop](#create-shop)
    - [3. Product](#3-product)
      - [For Shop](#for-shop)
        - [Get all draft products](#get-all-draft-products)
        - [Get all published products](#get-all-published-products)
        - [Create products](#create-products)
        - [Publish product](#publish-product)
        - [UnPublish product](#unpublish-product)
        - [Update product](#update-product)
      - [For Buyer](#for-buyer)
        - [Get all products](#get-all-products)
        - [Get product](#get-product)
        - [Search product](#search-product)


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

## APIs

### 0. Options for Plural APIs
#### Filter
  ```
  ?<field>=<value>
  ```
#### Select fields
  Use `_select`

  ```
  ?_select=<field>
  ```

#### Paginate
  Use _page and _limit to paginate returned data.

  ```
  ?_page=<number>&_limit=<number>
  ```
#### Sort
  Use _sort and _order.

  ```
  ?_sort=<field>&_order=<order_value>
  ```

  - _order receives values: asc, desc (default asc)

#### Full text search
  Use `_q`
  ```
  ?_q=<keyword>
  ```

### 1. Authentication

#### Sign Up

```
/api/<version>/access/sign-up
```

- Method: POST
- Header:
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
- Header:
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
- Header:
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
- Header:
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
  - Header:
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
  - Header:
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
  - Header:
    - x-api-key
    - x-client-id
    - authorization
    - x-shop-id
  - Body: json, fields of the product

#### For Buyer
##### Get all products

  ```
  /api/<version>/products/
  ```

  - Method: GET
  - Header:
    - x-api-key
  - Body: none

##### Get product

  ```
  /api/<version>/products/<productId>
  ```

  - Method: GET
  - HEADER:
    - x-api-key
  - Body: none

##### Search product

  ```
  /api/<version>/products/search/<keyword>
  ```

  - Method: GET
  - Header:
    - x-api-key
  - Body: none

> Copyright © 2023 by Doan Anh Kiet
