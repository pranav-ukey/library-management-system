# 📚 Library Management System API

A RESTful Library Management System built with **Node.js**, **Express.js**, and **MongoDB Atlas**. The application supports authentication, role-based authorization, book management, and borrowing/returning books.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication

### Authorization

* Role-Based Access Control
* Librarian
* Member

### Book Management

* Add Book
* Get All Books
* Get Book By ID
* Update Book
* Delete Book

### Borrow Management

* Borrow Book
* Return Book
* Prevent Duplicate Borrow
* View Borrow History

### Validation

* Request Validation using express-validator

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* express-validator
* CORS
* dotenv

---

## 📂 Folder Structure

```
library-management-system
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── validators
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone <your-github-repo-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URL=mongodb_connection_string
JWT_SECRET=jwt_secret_key
```

Run the server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Books

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /api/books     |
| GET    | /api/books     |
| GET    | /api/books/:id |
| PUT    | /api/books/:id |
| DELETE | /api/books/:id |

### Borrow

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | /api/books/:id/borrow          |
| POST   | /api/books/:id/return          |
| GET    | /api/members/my-borrowed-books |

---

## 🔒 Authentication

Protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 👥 Roles

### Librarian

* Add Book
* Update Book
* Delete Book

### Member

* Borrow Book
* Return Book
* View Borrow History

---

## ✅ Validation

Implemented using **express-validator** for:

* Register
* Login
* Add Book

---

## 🌐 Deployment

Backend URL:

(Add Render URL here after deployment)

---

## 👨‍💻 Author

Pranav Ukey
