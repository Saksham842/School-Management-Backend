# School Management API

A RESTful Node.js + MySQL API that manages schools and returns them sorted by proximity using the **Haversine formula**.

---

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure MySQL
- Open MySQL Workbench (or terminal)
- Run `database/schema.sql` to create the DB and table

### 3. Update `.env` file
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
PORT=3000
```

### 4. Start the server
```bash
npm start
# or for development with auto-restart:
npm run dev
```

Server runs at → `http://localhost:3000`

---

## 📡 API Endpoints

### ➕ POST `/addSchool`
Adds a new school to the database.

**Request Body (JSON):**
```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5355,
  "longitude": 77.3910
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully!",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5355,
    "longitude": 77.391
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name is required and must be a non-empty string."]
}
```

---

### 📋 GET `/listSchools?latitude={lat}&longitude={lon}`
Returns all schools sorted by distance from the user's coordinates (nearest first).

**Example Request:**
```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Found 5 school(s) sorted by proximity.",
  "user_location": {
    "latitude": 28.6139,
    "longitude": 77.209
  },
  "data": [
    {
      "id": 4,
      "name": "St. Columbus School",
      "address": "Ashok Place, New Delhi",
      "latitude": 28.6353,
      "longitude": 77.209,
      "distance_km": 2.38
    },
    ...
  ]
}
```

---

## 🏗️ Project Structure
```
task/
├── database/
│   └── schema.sql          # MySQL setup script
├── src/
│   ├── config/
│   │   └── db.js           # MySQL connection pool
│   ├── controllers/
│   │   └── schoolController.js  # Business logic
│   ├── routes/
│   │   └── schoolRoutes.js # Route definitions
│   ├── utils/
│   │   └── haversine.js    # Distance calculation
│   └── app.js              # Express entry point
├── .env                    # Environment variables
├── .gitignore
└── package.json
```
