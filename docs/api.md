# University Security API Documentation
## Base URL
http://localhost:5000

---
## 1. Register Admin
**Endpoint:** 'POST /admin/register'

### Request Body:
```json
{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "secure password"
}
```
### Response:
```json
{
    "message": "Admin registered successfully",
    "admin": {"id": "60c72b2f9b1e8b0015c8f11d",
    "email": "admin@example.com"
    }
}
```
## 2. Admin Login

**Endpoint:** 'POST /admin/login'

### Request Body:
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
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

