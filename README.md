# HTTP-Authentication

An Express HTTP server that allows users to signup, login and logout of your application

User stories:
  - when you are not logged in
    - and you visit `/` (the home page) you see:
      - "Hello Stranger"
      - a link to `/signup`
      - a link to `/login`
    - and you visit `/signup`
      - you see:
        - a form with:
          - email
          - password
          - password confirmation
          - "Signup" button
      - and you submit the signup form
        - with no values
          - you should see the signup page again but with the error "please provide
          an email and a password to sign up"
        - with a value in the password field that
          does not match the value in the password confirmation field
          - you should see the signup page again but with the error "passwords do
          not match"
        - with a valid email, and matching passwords
          - a new user should be inserted into the database
          - your session cookie should be updated with the new user id
          - you should be logged in and redirected to the homepage
    - and you visit `/login` you see:
      - a form with:
        - email
        - password
    - and you submit the login form
      - with no values
        - you should see the login page again with the error "please provide an
        email and a password to login"
      - with a correct email but an incorrect password
        - you should see the login page again with the error "incorrect email
        or password"
      - with an incorrect email and any password
        - you should see the login page again with the error "incorrect email
        or password"
      - with a matching email and password
        - you should be logged in and redirect to the home page
  - when you are logged in
    - and you visit `/` (the home page) you see:
      - "Welcome back [email address]"
      - a link to `/logout`
    - and you visit `/login`
      - you are redirected to the homepage
    - and you visit `/signup`
      - you are redirected to the homepage
    - and you visit `/logout`
      - are logged out and then redirected to the home page
     
Usage:
- git clone project to your local machine
- run `npm install`
- run `npm run db:setup`
- Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. 
``` 
DATABASE_URL=<your postgres url>
TEST_DATABASE=<your postgres test url>
SECRET=<any string> 
```
- run `npm start`
- navigate to `http://localhost:3000`
- Sign up and enjoy all the non existent services this site has to offer :)

To run tests:
- run `npm run test`
