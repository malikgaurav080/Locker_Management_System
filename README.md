# Locker Management System - Express JS
This is the Microservice architecture of Locker Managemet system with total 4 API's-
- User API - (PORT: 3001)
- Admin API - (PORT: 3002)
- Assigned Locker API - (PORT: 3003)
- LockerType API - (PORT: 3004)

Here I am using <b>http-proxy-middlewre</b> for API Gateway and its running on PORT 3000.

### API's to showcase CRUD operations using Express JS with Authentication using JWT Tokens. Using Bcrypt and AES mechanism for secure Passwords and keys. Using Node-mailer for send the notification to USer and Admin
- User Signup Notification
- User SignIn Notification
- User Wrong Password Notification
- User Request added successfully Notification
- Admin new request added Notification

## Features of User API
- Signup and Sigin Feature.
- At the time of SignUp Password will encryped with the help of Bcyrpt and keys are encryped with the help of AES.
- A token will generate at the time of signIn with the help of JWT.
- User can see there profile with the help of SignIn Token.
- User can send request to the admin for create a locker.
- User can reset password after verifying all keys. 

## Features of Admin API
- SignUp and SignIn Feature.
- At the time of SignUp Password will encryped with the help of Bcyrpt, no keys required for SignUp. 
- A token will generate at the time of signIn with the help of JWT.
- Admin can use there token to see all the user details and Locker Details.
- Admin can check the user request for Locker creation.
- Already exist Admin only can create a new Admin with the help of Admin SignIn token.

## Features of Assigned Locker API
- Admin can get all locker details and perform CRUD operations on it with the help of Admin SignIn Token.
- User can only get his Details with the help of User SignIn token and can send request to the Admin to change it if required.
- Using Fetch API <b>LockerType API</b> will auto update on Add locker and Delete Locker.

## Features of LockerType API
- Admin can get all lockerType details and perform CRUD operations on it with the help of Admin SignIn Token.
- There is no role for User in this API, only Admin can Perform CRUD if required or to maintain the consistency.
- The number of locker will auto update with respect to the size of locker using FETCH.


### Run below command to clone the code repository from Github:

```bash
git clone https://gitlab.stackroute.in/GauravMalik/locker_management_final_project
```


