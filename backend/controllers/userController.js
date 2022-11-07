const User = require('../models/userModel');

const Errorhandler = require('../utils/errorhandler');

const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Register a User
exports.registerUser = catchAsyncError(

    async (req, res, next) => {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale",

        });

        const { name, email, password } = req.body;

        const user = await User.create(
            {
                name,
                email,
                password,
                //given by us ahile ko lagi
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
        );

        sendToken(user, 201, res);
    }
);

//Login 
exports.loginUser = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;

        //checking if user has given password and email both
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email and Password", 400))
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user, 200, res);

    }
);

//logout user
exports.logout = catchAsyncError(
    async (req, res, next) => {

        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(200).json({
            success: true,
            message: "logged out",
        });
    }

);

//forgot password 
exports.forgotPassword = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorHandler('user not found', 404));
        }

        //Get ResetToken
        const resetToken = user.getResetPasswordToken();

        //note: jada chai forgotPassword call hunxa taba matra
        //hamle resetpasswordtoken and passwordkoexpire userschma 
        //maa save garni ho tei vara yeta bata save garum

        await user.save({ validateBeforeSave: false });

        // lets make link so resettoken append garira pathauna(query)
        //if we deploy then this ${req.protocol}://${req.get('host')}
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Online Shopping Password Recovery ',
                message,
            });
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            })
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500));
        }
    }
);

//reset password
exports.resetPassword = catchAsyncError(
    async (req, res, next) => {
        //creating token hash
        const resetPasswordToken = crypto.createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        if (!user) {
            return next(new Errorhandler("Reset Password Token is invalid or has been expired", 400));

        }

        if (req.body.password != req.body.confirmPassword) {
            return next(new Errorhandler("Password does not match", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        //sab save garni after above conditions
        await user.save();

        //relogin garni dini
        sendToken(user, 200, res);


    }
);

//Get user detail
exports.getUserDetails = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });
    }

);

//update user password

exports.updatePassword = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatch) {
            return next(new Errorhandler('Old Password is incorrect', 400));
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new Errorhandler('password does not match', 400))
        }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);


    }
);

//update user profile

exports.updateProfile = catchAsyncError(
    async (req, res, next) => {

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        }
        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id);

            const imageid = user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageid);

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'avatars',
                width: 150,
                crop: "scale",

            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            userFindAndModify: false,
        });

        res.status(200).json({
            success: true
        })
    }
)

// yo chai used by admin
//Get all users (admin)
exports.getAlluser = catchAsyncError(
    async (req, res, next) => {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        })
    }
);

//Get single user (admin)
exports.getSingleuser = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new Errorhandler(`user does not exist with Id:${req.params.id}`))
        }

        res.status(200).json({
            success: true,
            user,
        })
    }


);

//update user role (admin)
exports.updateUserRole = catchAsyncError(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            userFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        })
    }
);

//delete user (admin)
exports.deleteUser = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(`user does not exist with Id: ${req.params.id}`))
        }

        const imageid = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageid);

        await user.remove();
        res.status(200).json({
            success: true,
            message: "User Deleted successfully"
        })
    }
)
