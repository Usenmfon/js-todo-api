# Todo REST API

A complete Todo REST API built with Node.js, Express.js, MongoDB, Mongoose, dotenv, and CORS.

## Project Structure

```text
todos-api/
  config/
    db.js
  controllers/
    todoController.js
  models/
    Todo.js
  routes/
    todoRoutes.js
  .env
  .env.example
  .gitignore
  package.json
  server.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/todos-api
```

4. Start the development server:

```bash
npm run dev
```

5. For production:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Health Check

```http
GET /
```

### Fetch All Todos

```http
GET /api/todos
```

Example:

```bash
curl http://localhost:3000/api/todos
```

### Fetch One Todo

```http
GET /api/todos/:id
```

Example:

```bash
curl http://localhost:3000/api/todos/665f0a0a0a0a0a0a0a0a0a0a
```

### Create a Todo

```http
POST /api/todos
Content-Type: application/json
```

Example:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Learn Express\",\"description\":\"Build a Todo API\",\"completed\":false}"
```

### Update a Todo

```http
PUT /api/todos/:id
Content-Type: application/json
```

Example:

```bash
curl -X PUT http://localhost:3000/api/todos/665f0a0a0a0a0a0a0a0a0a0a \
  -H "Content-Type: application/json" \
  -d "{\"completed\":true}"
```

### Delete a Todo

```http
DELETE /api/todos/:id
```

Example:

```bash
curl -X DELETE http://localhost:3000/api/todos/665f0a0a0a0a0a0a0a0a0a0a
```

## Todo Schema

```js
{
  title: String, // required
  description: String, // optional
  completed: Boolean, // default: false
  createdAt: Date,
  updatedAt: Date
}
```

## Vercel Deployment

`server.js` exports the Express app with `module.exports = app`. The local HTTP listener only starts when running the file directly with `node server.js`, which keeps the app importable for serverless platforms.

Set the following environment variable in Vercel:

```text
MONGO_URI
```

If your Vercel setup invokes the local server entry directly, also set:

```text
PORT
```
