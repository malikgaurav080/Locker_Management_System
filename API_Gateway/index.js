const express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');


const app = express();


const port = process.env.PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const optionsUsers = {
  target: process.env.User_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsAdmin = {
  target: process.env.Admin_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsAssignedLocker = {
  target: process.env.AssignedLocker_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsLockerType = {
  target: process.env.LockerType_API_URL,
  changeOrigin: true, 
  logger: console,
};

const UsersProxy = createProxyMiddleware(optionsUsers);
const AdminProxy = createProxyMiddleware(optionsAdmin);
const AssignedLockerProxy = createProxyMiddleware(optionsAssignedLocker);
const LockerTypeProxy = createProxyMiddleware(optionsLockerType);


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.get('/', (req, res) => res.send('Hello Gateway API'));

//For Users API
app.post('/user/login', UsersProxy);
app.post('/user/signup', UsersProxy);
app.post('/user/sendLockerRequest', UsersProxy);
app.get('/user/profile', UsersProxy);
app.get('/user/details', UsersProxy);
app.put('/reset-password', UsersProxy);

//For Admin API
app.post('/admin/signin', AdminProxy);
app.post('/admin/signup', AdminProxy);

//For Assigned-Locker API Users
app.get('/locker/User-details',AssignedLockerProxy);

//For Assigned-Locker API Admin
app.get('/locker/details', AssignedLockerProxy);
app.get('/locker/details/:id', AssignedLockerProxy);
app.get('/locker/details-by-userId/:userId', AssignedLockerProxy);
app.get('/locker/details-by-LockerNumber/:LockerNumber',AssignedLockerProxy);
app.get('/locker/details-by-nameAndEmail/', AssignedLockerProxy);
app.put('/locker/update-locker/:id', AssignedLockerProxy);

// Fetch API for Admin
app.post('/locker/add-locker', AssignedLockerProxy);
app.delete('/locker/delete-locker/:id', AssignedLockerProxy);


//For Locker-Type API Admin
app.get('/lockerType/', LockerTypeProxy);
app.post('/lockerType/', LockerTypeProxy);
app.put('/lockerType/:lockerid', LockerTypeProxy);
app.delete('/lockerType//:lockerid', LockerTypeProxy);

//Fetch API will auto run by Assigned_Locker API
app.put('/lockerType/auto-inc/:lockerid', LockerTypeProxy);
app.put('/lockerType/auto-dec/:lockerid', LockerTypeProxy);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));