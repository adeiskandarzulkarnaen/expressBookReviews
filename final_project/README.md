# Express Book Reviews

A RESTful API for an online book review application built with Node.js and Express. Supports public and authenticated routes with JWT session-based authentication.

## Project Structure

```
final_project/
    ├── router/
    │   ├── general.js        # Public routes (no auth required)
    │   ├── auth_users.js     # Authenticated customer routes
    │   └── booksdb.js        # Book data
    ├── index.js              # Entry point, middleware setup
    ├── package.json
    └── README.md
submissions/
```

## Getting Started

```bash
npm install
node index.js
```

Server runs on `http://localhost:3000`

## API Endpoints

### Public Routes (no login required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all books |
| GET | `/isbn/:isbn` | Get book by ISBN |
| GET | `/author/:author` | Get books by author |
| GET | `/title/:title` | Get books by title |
| GET | `/review/:isbn` | Get reviews for a book |
| POST | `/register` | Register a new user |

### Authenticated Routes (login required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/customer/login` | Login as a registered user |
| PUT | `/customer/auth/review/:isbn` | Add or modify a book review |
| DELETE | `/customer/auth/review/:isbn` | Delete your book review |

## Authentication

Login returns a JWT stored in the session. Protected routes require an active session cookie.

```bash
# Login and save session
curl -X POST "http://localhost:3000/customer/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "zulkarnaen", "password": "secret"}' \
     -c cookie.txt

# Use session for protected routes
curl -X PUT "http://localhost:3000/customer/auth/review/1?review=This%20book%20is%20very%20good" \
     -b cookie.txt
```

## Async Implementations

Routes use modern async patterns:
- `GET /async` — Promise + Axios
- `GET /async/isbn/:isbn` — Promise + Axios
- `GET /async/author/:author` — Promise + Axios
- `GET /async/title/:title` — Promise + Axios