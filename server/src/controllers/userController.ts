import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { NewRequest, UserLoginReqBody, UserProfileType, UserRegisterReqBody } from './../types/allType.js';

export const Register = TryCatch(async (req: Request<{}, {}, UserRegisterReqBody>, res: Response, next: NextFunction) => {

    const { email, fullName, password, phoneNumber, role, profile } = req.body
    if (!email || !fullName || !password || !phoneNumber || !role) return next(new ErrorHandler("Please Enter All Fields", 400))

    const user = await User.findOne({ email })
    if (user) return res.status(200).json({
        message: `Account is already Exist with this Email :- ${email}`,
        success: true
    });

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile
    })

    res.status(201).json({
        message: "Registration Succsessfull",
        success: true
    });
});


export const login = TryCatch(

    async (req: Request<{}, {}, UserLoginReqBody>, res: Response, next: NextFunction) => {
        const { email, password, role } = req.body

        // if request body is missing some fields or its empty
        if (!email || !password || !role) return next(new ErrorHandler("Please Enter All Fields", 400));

        // check user is exist or not
        const loginUser = await User.findOne({ email })
        // if user is not exist
        if (!loginUser) return next(new ErrorHandler("Invalid Email Or Password", 400));

        // if user is exist

        const isPasswordMatch = await bcrypt.compare(password, loginUser.password)

        // check for the passwoed

        if (!isPasswordMatch) return next(new ErrorHandler("Invalid Email Or Password", 400));


        // check the user role

        if (role !== loginUser.role) return next(new ErrorHandler(`No Account exist with given role associated with your credentials`, 400));



        // user is exist and have filled all details true
        // we create the token first

        const tokenData = {
            userId: loginUser._id
        }
        const secretKey = process.env.SECRET_KEY!
        const token = jwt.sign(tokenData, secretKey, { expiresIn: "1d" });
        const cookiesOptions = { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }

        const user = {
            UserId: loginUser._id,
            fullName: loginUser.fullName,
            email: loginUser.email,
            role: loginUser.role,
            phoneNumber: loginUser.phoneNumber,
            profile: loginUser.profile
        }


        res.status(200).cookie("token", token, cookiesOptions).json({
            message: `Login Successfully, Welcome ${loginUser.fullName}`,
            success: true,
            user,
        })

    }
)

export const logout = TryCatch(async (req, res, next) => {

    res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Logout Successfully",
        success: true,

    })

});


export const updateProfile = TryCatch(async (req: NewRequest<{},{}>, res, next) => {
    const id = req.id;
    const { fullName, email, phoneNumber, profile, role } = req.body




    const user = await User.findById(id)

    if (!user) return next(new ErrorHandler("user not found", 400))

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role

    if (profile) {
        const { bio, company, profilePhoto, resume, resumeOriginalName, skills }: UserProfileType = profile
        if (bio) user.profile!.bio = bio
        if (profilePhoto) user.profile!.profilePhoto = profilePhoto
        if (resume) user.profile!.resume = resume
        if (resumeOriginalName) user.profile!.resumeOriginalName = resumeOriginalName
        if (skills) user.profile!.skills = skills
    }


    await user.save()
    const updatedUser = {
        UserId: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profile: user.profile
    }


    return res.status(200).json({
        message: "Profile Updated Successfully",
        updatedUser,
        success: true
    });



});