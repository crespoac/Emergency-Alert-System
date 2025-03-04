import requests
from unittest import TestCase, main

BASE_URL= "http://localhost:5001/api"
REGISTER_URL = f"{BASE_URL}/register"
VERIFY_URL = f"{BASE_URL}/verify"
DELETE_USERS_URL = f"{BASE_URL}/delete-test-users" 

def deleteUsers():
    #Deletes all test users from the database after each test
    response = requests.delete(DELETE_USERS_URL)
    if response.status_code == 200:
        print("✅ Test users deleted successfully")
    else:
        print("❌ Failed to delete test users")

class TestRegisterEndpoints(TestCase):

    #Runs once before all test and registers test users
    @classmethod
    def setUpClass(cls):
        cls.headers = {"Content-Type": "application/json"}

        cls.test_users = {
            "admin": {
                "name": "Clark Kent",
                "email": "superman@example.com",
                "password": "securepassword",
                "role": "admin"
            },
            "security": {
                "name": "Bruce Wayne",
                "email": "batman@example.com",
                "password": "securepassword",
                "role": "security",
                "badgeNumber": "12345"
            },
            "verified_user": {
                "name": "John Doe",
                "email": "johndoe@example.com",
                "password": "securepassword",
                "role": "user"
            },
            "unverified_user": {
                "name": "Nick Cage",
                "email": "ghostrider@example.com",
                "password": "securepassword",
                "role": "user"
            }
        }

        cls.tokens = {} #Store tokens

        #Register users and store their tokens 
        for role, user_data in cls.test_users.items():
            token = cls.register_user(user_data)
            if token and role != "unverified_user":
                cls.tokens[role] = token

        cls.verify_users()

    @classmethod
    def register_user(cls, user_data):
        response = requests.post(REGISTER_URL, json=user_data, headers=cls.headers)

        print(f"Response JSON: {response.json()}")

  
        if response.status_code == 201:
            user_data = response.json().get("user")  #Extract user object from response
            if user_data:
                token = user_data.get("verificationToken")  #Extract the token from user data
                if token:
                    return token

        print("Registration failed or token missing")
        return None
    
    @classmethod
    def verify_users(cls):
        #Automatically verifies all users except the unverified one
        for role, token in cls.tokens.items():
            if role != "unverified_user":  # Skip verification for the unverified user 
                verify_response = requests.get(f"{VERIFY_URL}/{token}")
                if verify_response.status_code == 200:
                    print(f"✅ {role} verified successfully")
                else:
                    print(f"❌ Verification failed for {role}")


    def test_registered(self):
        self.assertEqual(len(self.tokens), 3)  #Unverified user won’t have a token so there would be 3

if __name__ == "__main__":
    deleteUsers()
    main()


