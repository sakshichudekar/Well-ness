mindful-maker-app-main/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── .env
└── frontend/
    └── src/
        ├── lib/
        │   └── api.ts   ← Axios instance here
        ├── pages/
        │   ├── Login.tsx
        │   ├── Register.tsx
        │   └── ...
1. Setup Backend
Go to the backend folder:

bash
Copy
Edit
cd backend
Create a .env file:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/arvyax
JWT_SECRET=your-secret-key
Install dependencies:

bash
Copy
Edit
npm install
Run the server:

bash
Copy
Edit
npm run dev
✅ You should see:

arduino
Copy
Edit
Server running on port 5000
MongoDB connected
💻 2. Setup Frontend
Go to the frontend folder:

bash
Copy
Edit
cd ../frontend
Create the Axios API service in src/lib/api.ts:

ts
Copy
Edit
// src/lib/api.ts
import axios from "axios";

export const apiService = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
Make sure all API calls use this apiService. Example (in Login.tsx):

ts
Copy
Edit
import { apiService } from "@/lib/api";

const response = await apiService.post("/auth/login", { email, password });
Install dependencies:

bash
Copy
Edit
npm install
Start the React frontend:

bash
Copy
Edit
npm run dev
🧪 3. Test User Flow
Signup on the frontend → should send request to POST /auth/register

Login → POST /auth/login

Token should be stored in localStorage or cookies

All authenticated requests (e.g., /my-sessions) should include the token in headers.

