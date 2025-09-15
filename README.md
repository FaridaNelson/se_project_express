# SE_PROJECT_EXPRESS

This backend project is part of the **What To Wear According To The Weather** app. It provides RESTful API endpoints for user authentication and clothing item management, including creating, deleting, liking, and unliking items.

## 🧩 Features

- User authentication and authorization
- CRUD operations for clothing items
- Like/unlike clothing items
- Error handling with proper status codes
- MongoDB database integration using Mongoose

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FaridaNelson/se_project_express.git
   cd se_project_express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add:

   ```env
   PORT=3001
   ```

   You may also need to add your MongoDB connection string later (e.g., `MONGODB_URI=`) if you plan to host this on a service like MongoDB Atlas.

4. **Start the server:**

   ```bash
   npm run start
   ```

   For development with automatic restarts:

   ```bash
   npm run dev
   ```

## 🚀 Usage

Once the server is running, you can access the API at:

```
http://localhost:3001
```

### API Endpoints (Sample)

- `POST /signup` – Register a new user
- `POST /signin` – Log in
- `GET /items` – Get all clothing items
- `POST /items` – Create a new clothing item
- `DELETE /items/:id` – Delete a clothing item
- `PUT /items/:id/likes` – Like a clothing item
- `DELETE /items/:id/likes` – Unlike a clothing item

> All protected routes require a valid JWT in the `Authorization` header:  
> `Authorization: Bearer <token>`

## 🔐 Environment Variables

| Variable | Description                            |
| -------- | -------------------------------------- |
| PORT     | Port number to run the app (e.g. 3000) |

> You can extend this with other variables like `JWT_SECRET`, `MONGODB_URI`, etc., as your project grows.

## 🧪 Testing

You can use tools like **Postman** or **cURL** to test your API endpoints locally.

## Deployment

- **Frontend repository:** https://github.com/FaridaNelson/Weather-App

- **Production domain:** https://wtwr.star.is
