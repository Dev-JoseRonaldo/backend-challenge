<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descrição

API desenvolvida como atividade da disciplina de engenharia de software. Esta API permite operações CRUD para livros, além de buscar livros por gênero.

## Setup do Projeto

```js
// Após clonar o repositório, acesse a pasta do projeto e execute:
$ npm install
```

## Compilando e Executando o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Executando os testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Outros Scripts

```bash
# Executar o seed de dados
npm run seed
```

# Documentação da API

### Endereço Base

**Base URL:** `http://localhost:3000`

## 1. Create Book
  - **Descrição:** Cria um novo livro
  - **Método:** `POST`
  - **URL:** `/books`

  Exemplo de requisição:
  ```json
  POST /books
  Content-Type: application/json

  {
    "title": "O Senhor dos Anéis",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "year": 1954,
    "stock": 20
  }
  ```
  Resposta de Sucesso
- Status: `201 Created`
- Exemplo:
```json
{
  "id": 1,
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "year": 1954,
  "stock": 20
}
```

## 2. Get All Books
  - **Descrição:** Retorna todos os livros cadastrados
  - **Método:** `GET`
  - **URL:** `/books`

  Exemplo de Requisição
  ```json
  GET /books
  ```
 Resposta de Sucesso
  - Status: `200 OK`
  - Exemplo:

  ```json
  [
    {
      "id": 1,
      "title": "O Senhor dos Anéis",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasy",
      "year": 1954,
      "stock": 20
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "genre": "Dystopian",
      "year": 1949,
      "stock": 10
    }
  ]
```

## 3. Get Book By Id
  - **Descrição:** Retorna um livro específico
  - **Método:** `GET`
  - **URL:** `/books/:id`

  Exemplo de Requisição
  ```bash
  GET /books/1
  ```

  Resposta de Sucesso
  - Status: `200 OK`
  - Exemplo:
  ```json
  {
    "id": 1,
    "title": "O Senhor dos Anéis",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "year": 1954,
    "stock": 20
  }
  ```

  Resposta de Erro
  - Status: `404 Not Found`
  - Exemplo:
  ```json
  {
    "message": "Book with ID 200 not found",
    "error": "Not Found",
    "statusCode": 404
  }
  ```


## 4. Update Book
  - **Descrição:** Atualiza um livro
  - **Método:** `PUT`
  - **URL:** `/books/:id`

  Exemplo de Requisição
  ```json
  PUT /books/1
  ```

  Resposta de Sucesso
  - Status: `200 OK`
  - Exemplo:
  ```json
  {
    "id": 1,
    "title": "O Senhor dos Anéis",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "year": 1954,
    "stock": 15
  }
  ```

  Resposta de Erro
  - Status: `404 Not Found`
  - Exemplo:
  ```json
  {
    "message": "Book with ID 200 not found",
    "error": "Not Found",
    "statusCode": 404
  }
  ```

## 5. Delete Book
  - **Descrição:** Deleta um livro
  - **Método:** `DELETE`
  - **URL:** `/books/:id`

  Exemplo de Requisição
  ```json
  DELETE /books/1
  ```

  Resposta de Sucesso
  - Status: `200 OK`

  Resposta de Erro
  - Status: `404 Not Found`
  - Exemplo:
  ```json
  {
    "message": "Book with ID 200 not found",
    "error": "Not Found",
    "statusCode": 404
  }
  ```

## 6. Get Books By Genre
  - **Descrição:** Retorna todos os livros de um determinado gênero
  - **Método:** `GET`
  - **URL:** `/books/search?genre={genre}`

  Exemplo de Requisição
  ```json
  GET /books/search?genre=Fantasy
  ```
  Resposta de Sucesso
  - Status: `200 OK`
  - Exemplo:
  ```json
  [
    {
      "id": 1,
      "title": "O Senhor dos Anéis",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasy",
      "year": 1954,
      "stock": 20
    }
  ]
  ```
  Resposta de Erro
  - Status: `404 Not Found`
  - Exemplo:
  ```json
  {
    "message": "No books found with genre 'Horror'",
    "error": "Not Found",
    "statusCode": 404
  }
  ```

  - Status: `400 Bad Request`
  - Exemplo:
  ```json
  {
    "message": "Genre parameter is required",
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

## Estrutura de Dados do Livro (Book)
- `id` (número) - Identificador único do livro.
- `title` (string) - O título do livro.
- `author` (string) - O autor do livro.
- `genre` (string) - O gênero literário do livro.
- `year` (número) - Ano de publicação.
- `stock` (número) - Quantidade em estoque.

## Status de Erros
A API pode retornar os seguintes status de erro:

- `404 Not Found` – Recurso não encontrado.
- `400 Bad Request` – Requisição inválida.
- `500 Internal Server Error` – Erro interno no servidor.
