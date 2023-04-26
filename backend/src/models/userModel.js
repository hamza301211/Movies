const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "Password cannot be less than 8 characters"],
        select: false
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)

})

//jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//reset password
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and add to userschema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordToken = Date.now() + 15 * 60 * 1000;

    return resetToken;

}

const Register = new mongoose.model("User", userSchema);
module.exports = Register;