// node modules
const { json } = require('body-parser');
const express = require('express');
const { networkInterfaces } = require('os');
const morgan = require('morgan'); 
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes'); 

const app = express();

// MIDDLEWARES

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello anuj');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;