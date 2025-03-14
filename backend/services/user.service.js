const userModel = require("../models/user.model");

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    try {   
        if (!firstname || !email || !password) {
            throw new Error("All fields are required");
        }
        const newUser = await userModel.create({fullname : {firstname, lastname}, email, password});                   
        return newUser; 
    } catch (error) {   
        throw error;    
    }
};