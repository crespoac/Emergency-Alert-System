# Emergency Alert System - Backend Setup

## Project Overview
This is the backend for the **Emergency Alert System** built using **Node.js, Express, MongoDB, and JWT authentication**.  
It provides API endpoints for **admin authentication, protected routes, and user management** so far.

---

## Prerequisites
Before setting up the project, make sure you have the following installed:  

- ✅ **[Node.js](https://nodejs.org/)**
- ✅ **[MongoDB](https://www.mongodb.com/docs/manual/installation/)** (Run `brew install mongodb-community` for macOS)
- ✅ **[Git](https://git-scm.com/)**

---

## Clone the Repository
Run the following command to clone the repository:
```bash
git clone https://github.com/your-username/Emergency-Alert-System.git
cd Emergency-Alert-System
```

## Switch to Backend Branch
```bash
git checkout backend-setup-0.0
git pull origin backend-setup-0.0
```
## After cloning install all dependencies
```bash
npm install
``` 
## Set up env file
I ignored the env file for obvious reasons. These has sensitive information on it that should not be accessible. In our discord I will have it in general. Take this file and place it in the university-secuirty-backend directory

## To start server open terminal in the directory of university-security-backend and run this command
```bash
npx nodemon server.js
```
## If everything goes as planned you will see
```bash
🚀 Server running at http://localhost:5001/api
✅ MongoDB Connected
```

### There is API documentation in the api.md, you can take a look at to see the structure of our API and test what is available already

## Now to contribute you will do the following
```bash
git pull origin backend-setup-0.0
```
## Make new branch 
```bash
git checkout -b feature-branch-name
```

## After changing commit and push
```bash
git add .
git commit -m "Added feature XYZ"
git push origin feature-branch-name
```
