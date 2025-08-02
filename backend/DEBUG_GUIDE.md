# 🔧 Debugging Guide: Registration Issue

This guide will help you debug and fix the registration issue in your WellnessFlow app.

## 🚀 Quick Fix Steps

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```

### 2. Test the Backend API
```bash
npm test
```

### 3. Check Frontend Console
Open browser dev tools and check the console for detailed logs.

## 🔍 Detailed Debugging

### Backend Verification

1. **Check if server is running:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Test registration endpoint directly:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Expected response:**
   ```json
   {
     "success": true,
     "message": "User registered successfully",
     "data": {
       "userId": "...",
       "email": "test@example.com",
       "token": "..."
     }
   }
   ```

### Frontend Debugging

1. **Check API configuration:**
   - Verify `src/lib/api.ts` has correct base URL
   - Ensure CORS is properly configured

2. **Check browser network tab:**
   - Look for the registration request
   - Verify request payload and response

3. **Check console logs:**
   - The enhanced Register.tsx now has detailed logging
   - Look for "🚀 Registration attempt" and "✅ Full server response"

## 🐛 Common Issues & Solutions

### Issue 1: "Network Error"
**Symptoms:** Frontend shows network error
**Solution:** 
- Ensure backend is running on port 5000
- Check if MongoDB is connected
- Verify CORS configuration

### Issue 2: "Invalid response structure"
**Symptoms:** Backend works in Postman but frontend fails
**Solution:**
- Check if response structure matches expected format
- Verify `res.data.success` and `res.data.data` exist

### Issue 3: "Missing required fields"
**Symptoms:** Registration fails with incomplete data error
**Solution:**
- Check if backend is returning all required fields
- Verify JWT_SECRET is set in .env

### Issue 4: "CORS Error"
**Symptoms:** Browser blocks request due to CORS
**Solution:**
- Ensure backend CORS includes `http://localhost:5173`
- Check if credentials are properly configured

## 🧪 Testing Checklist

### Backend Tests
- [ ] Server starts without errors
- [ ] MongoDB connects successfully
- [ ] `/health` endpoint returns 200
- [ ] Registration endpoint accepts valid data
- [ ] Registration endpoint rejects invalid data
- [ ] Response structure is correct

### Frontend Tests
- [ ] API base URL is correct
- [ ] Registration form submits data
- [ ] Console shows detailed logs
- [ ] Success toast appears
- [ ] User is redirected to dashboard
- [ ] localStorage contains user data

## 📊 Debugging Commands

### Backend
```bash
# Start server with detailed logging
npm run dev

# Test registration endpoint
npm test

# Check MongoDB connection
npm run test:setup
```

### Frontend
```bash
# Start development server
npm run dev

# Check for TypeScript errors
npm run lint
```

## 🔧 Environment Variables

Ensure your `.env` file has:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mindful-maker
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 📝 Enhanced Logging

The updated Register.tsx includes:
- 🚀 Registration attempt logging
- ✅ Full server response logging
- 📦 Response data structure logging
- 💾 localStorage storage confirmation
- ❌ Detailed error logging

## 🎯 Success Indicators

When everything works correctly, you should see:
1. Backend console: "MongoDB Connected" and "User registered successfully"
2. Frontend console: Detailed registration logs
3. Browser: Success toast notification
4. Navigation: Redirect to dashboard
5. localStorage: Contains token, userEmail, and userId

## 🆘 Still Having Issues?

1. **Check the test script output:**
   ```bash
   npm test
   ```

2. **Verify MongoDB is running:**
   ```bash
   # If using local MongoDB
   mongod
   
   # If using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Check all console logs** (both backend and frontend)

4. **Verify network requests** in browser dev tools

5. **Test with Postman** to isolate frontend vs backend issues 