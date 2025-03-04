# Alex
# University Security API Documentation
## Base URL
http://localhost:5000

---
## 1. Register User, Admin, or Security Personnel
**Endpoint:** 'POST /register'

### Request Body:
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "secure password",
    "role": "specify_role"
}
```
### Response:
```json
{
    "message": "Role registered successfully",
    "admin": {"id": "60c72b2f9b1e8b0015c8f11d",
    "email": "johndoe@example.com",
    "role": "specify_role"
    }
}
```
## 2. User, Admin, or Security Personnel Login

**Endpoint:** 'POST /login'

### Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "specified_role"
}
```
### Response:
```json
{
  "message": "Login successful",
  "token": "your_jwt_token_here"
}
```

**Endpoint:** 'GET /admin/dashboard'

### Headers:
Authorization: Bearer your_jwt_token_here

### Response
```json
{
    "message": "Welcome, Admin!"
}
``` 

## 3. Test the login and registration

### Register
```bash
curl -X POST http://localhost:5001/api/register -H "Content-Type: application/json" -d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "specify_role"
}'
```

### Login
```bash
curl -X POST http://localhost:5001/api/login -H "Content-Type: application/json" -d '{
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "specify_role"
}'
```

### Access protected route
```bash
curl -X GET http://localhost:5001/api/admin/dashboard -H "Authorization: Bearer your_jwt_token_here"
```

## Email Verification Process
After registration, users must verify their email before logging in.

### **Steps to Verify Email**
1. Register using the **`/api/register`** endpoint.
2. An email will be sent with a verification link.
3. Click the link or send a GET request to the endpoint with the verification token.
4. Once verified, the user can log in.

### **How to Manually Verify an Email (For Testing)**
```bash
curl -X GET http://localhost:5001/api/verify/YOUR_VERIFICATION_TOKEN
```

