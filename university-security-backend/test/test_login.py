#Alex
import requests
import unittest 
from unittest import TestCase, main
from test_register import deleteUsers



LOGIN_URL = "http://localhost:5001/api/login"



class TestAuthEndPoints(TestCase):

    def setUp(self):
        #Runs before each test case.
        self.headers = {"Content-Type": "application/json"}
        self.valid_user = {
            "email": "johndoe@example.com",
            "password": "securepassword",
            "role": "user"
        }
        self.unverified_user = {
            "email": "ghostrider@example.com",
            "password": "securepassword",
            "role": "user"
        }
        self.invalid_login = {
            "email": "johndoe@example.com",
            "password": "wrongpassword",
            "role": "user"
        }
        self.empty_fields = {
            "email": "",
            "password": "",
            "role": "user"
        }
        self.admin_login = {
            "email": "superman@example.com",
            "password": "securepassword",
            "role": "admin"
        }
        self.security_login = {
            "email": "batman@example.com",
            "password": "securepassword",
            "role": "security"
        }

    def test_login_success(self):
        #Test succesful login
        response = requests.post(LOGIN_URL, json=self.valid_user, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())  #Ensure that JWT is returned, by checking for token key in json response
        print("Successful Login Test. Able to login with verified account")


    def test_unverified_email_login(self):
        #Test login with unverified email, this should fail resulting in response 400 
        response = requests.post(LOGIN_URL, json=self.unverified_user, headers=self.headers)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Verify email before logging in.", response.json()["message"])
        print("Successful Unverified Email Login Test. Not able to login with unverified account, and resulted in expected message")


    def test_incorrect_login(self):
        #Test login with incorrect password, this should fail resulting in response 400 
        response = requests.post(LOGIN_URL, json=self.invalid_login, headers=self.headers)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid email or password", response.json()["message"])
        print("Successful Incorrect Login Test. Not able to login with wrong password, and resulted in expected message")


    def test_login_with_empty_fields(self):
        #Test login with empty fields, this should fail resulting in response 400 
        response = requests.post(LOGIN_URL, json=self.empty_fields, headers=self.headers)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid email or password", response.json()["message"])
        print("Successful Empty Login Test. Not able to login with empty fields, and resulted in expected message")


    def test_role_based_login(self):
        #Test login based off roles (Using Admin and Security Personnel) 
        
        #Admin Login Test (Should respond with status code 200 for success)
        admin_response = requests.post(LOGIN_URL, json=self.admin_login, headers=self.headers)
        self.assertEqual(admin_response.status_code, 200)
        self.assertIn("token", admin_response.json())
        print("Successful Role Based Login Test. Able to login with verified admin account")


        #Security Personnel Login Test (Should respond with status code 200 for success)
        security_response = requests.post(LOGIN_URL, json=self.security_login, headers=self.headers)
        self.assertEqual(security_response.status_code, 200)
        self.assertIn("token", security_response.json())
        print("Successful Role Based Login Test. Able to login with verified Security Personnel account")


if __name__ == "__main__":
    main()