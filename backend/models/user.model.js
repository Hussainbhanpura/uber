const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fullname: {
      firstname : {
        type : String,
        required: true,
        minlength: [3,'First name be at least 3 characters long']
      },
      lastname : {
        type : String,
        required: true,
        minlength: [3,'Last name be at least 3 characters long']
      }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    return token;
}

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password); 
}

UserSchema.statics.hashPassword = async function(password) {
    return bcrypt.hash(password, 10);
}


module.exports = mongoose.model("User", UserSchema);
