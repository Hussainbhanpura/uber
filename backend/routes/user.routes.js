const express = require('express');
const router = express.Router();    
const {body} = require('express-validator');

const { register } = require('../controllers/user.controller');

router.post('/register', [body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], register);

module.exports = router;
