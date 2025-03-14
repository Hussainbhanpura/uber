const User = require("../models/user.model");
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");

module.exports.register = async (req, res) => {              
    try {    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullname, email, password } = req.body;
        const hashedPassword = await User.hashPassword(password);
        const user = await userService.createUser({firstname :  fullname.firstname,lastname: fullname.lastname, email, password: hashedPassword });
        const token = await user.generateAuthToken();
        res.status(201).json({ message: "User registered successfully", token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};