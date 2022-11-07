const moongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new moongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "name cannot exceed 30 characters"],
        minlength: [3, "Name should have atleast 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]

    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password should be greater than 8 characters"],
        select: false, // when query it would not provide password field 

    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//password hashing

userSchema.pre("save", async function (next) {

    //yadi password change navko case maa just skip to next process 
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN

userSchema.methods.getJWTToken = function () {
    //making jwt 
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    )
};

//compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generating token 20 byte ko garxa 
    const resetToken = crypto.randomBytes(20).toString('hex');

    // ani hashing garni and add to userSchema ko reset prassword token maa
    this.resetPasswordToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex');
    // ani yo hash lie 15min paxi expire garauni 

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    //why we return resettoken ??
    return resetToken;
}

module.exports = moongoose.model('User', userSchema);



