# School Management API

A simple Node.js + MySQL API to manage schools and sort them by proximity.

### 1. Add School
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Description**: Adds a new school to the database.
- **Payload (JSON)**:
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 28.5,
  "longitude": 77.0
}
```

### 2. List Schools
- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Parameters**: `latitude`, `longitude`
- **Description**: Returns all schools sorted by proximity to the provided coordinates (nearest first).
- **Example**: `{RENDER_URL}/listSchools?latitude=28.6&longitude=77.2`

## Local Setup
1. `npm install`
2. Update `.env` with your MySQL credentials.
3. `npm start`