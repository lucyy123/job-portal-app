import bcrypt from "bcryptjs";
import fs from 'fs';
import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
//*-------------------------------------- REGISTER USER------------------------------
export const Register = TryCatch(async (req, res, next) => {
    const { email, fullName, password, phoneNumber, role, } = req.body;
    //!------------------------------------ Getting the user profile photo ---------------------- //
    const profilePhoto = req.file;
    if (!email || !fullName || !password || !phoneNumber || !role)
        return next(new ErrorHandler("Please Enter All Fields", 400));
    const user = await User.findOne({ email });
    if (user)
        return res.status(200).json({
            message: `Account is already Exist with this Email :- ${email}`,
            success: true,
        });
    const hashedPassword = await bcrypt.hash(password, 10);
    //?------------------------------------ uploading  the user profile photo on  C L O U D I N A R Y---------------------- //
    const profilePhotoCloud = await uploadOnCloudinary(profilePhoto?.path);
    //!-----------------------Delete the locally save photo-------------------------------//
    if (profilePhoto?.path) {
        const deletedPhoto = fs.unlinkSync(profilePhoto?.path);
        console.log('deletedPhoto:', deletedPhoto);
    }
    await User.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profilePhoto: profilePhotoCloud?.url || "",
    });
    res.status(201).json({
        message: "Registration Succsessfull",
        success: true,
    });
});
//*------------------------------------------------ LOGIN USER -----------------------------------
export const login = TryCatch(async (req, res, next) => {
    const { email, password, role } = req.body;
    // if request body is missing some fields or its empty
    if (!email || !password || !role)
        return next(new ErrorHandler("Please Enter All Fields", 400));
    // check user is exist or not
    const loginUser = await User.findOne({ email });
    // if user is not exist
    if (!loginUser)
        return next(new ErrorHandler("Invalid Email Or Password", 400));
    // if user is exist
    const isPasswordMatch = await bcrypt.compare(password, loginUser.password);
    // check for the passwoed
    if (!isPasswordMatch)
        return next(new ErrorHandler("Invalid Email Or Password", 400));
    // check the user role
    if (role !== loginUser.role)
        return next(new ErrorHandler(`No Account exist with given role associated with your credentials`, 400));
    // user is exist and have filled all details true
    // we create the token first
    const tokenData = {
        userId: loginUser._id,
    };
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(tokenData, secretKey, { expiresIn: "1d" });
    const cookiesOptions = { maxAge: 86400 };
    const user = {
        UserId: loginUser._id,
        fullName: loginUser.fullName,
        email: loginUser.email,
        role: loginUser.role,
        phoneNumber: loginUser.phoneNumber,
        bio: loginUser.bio,
        skills: loginUser.skills,
        resume: loginUser.resume || "",
        resumeOriginalName: loginUser.resumeOriginalName || "",
        company: loginUser.company,
        profilePhoto: loginUser.profilePhoto,
    };
    res
        .status(200)
        .cookie("token", token, { maxAge: 86400, priority: "high", sameSite: "lax", httpOnly: true, path: "/" })
        .json({
        message: `Welcome ${loginUser.fullName}`,
        success: true,
        user,
    });
});
//*---------------------------------------- LOGOUT USER----------------------------------------------
export const logout = TryCatch(async (req, res, next) => {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Logout Successfully",
        success: true,
    });
});
//*----------------------------------------- UPDATE USER-------------------------------------------
export const updateProfile = TryCatch(async (req, res, next) => {
    const id = req.id;
    const { fullName, email, phoneNumber, role, bio, resumeOriginalName, profilePhoto, skills, } = req.body;
    const resume = req.file;
    const user = await User.findById(id);
    console.log('user:', user);
    if (!user)
        return next(new ErrorHandler("user not found", 400));
    if (fullName)
        user.fullName = fullName;
    if (email)
        user.email = email;
    if (phoneNumber)
        user.phoneNumber = phoneNumber;
    if (role)
        user.role = role;
    if (bio)
        user.bio = bio;
    if (profilePhoto)
        user.profilePhoto = profilePhoto;
    if (resumeOriginalName)
        user.resumeOriginalName = resumeOriginalName;
    if (skills) {
        user.skills = skills.split(",");
    }
    //*------------------if user upload the new resume or  update it --------------------
    const uploadedResume = await uploadOnCloudinary(resume?.path);
    //!-----------------------Deleted the resume locally saved ----------------------
    const deletedResume = fs.unlinkSync(resume?.path);
    console.log('deletedResume:', deletedResume);
    const resumeOrignal = resume?.originalname;
    if (resume) {
        user.resume = uploadedResume?.url;
        user.resumeOriginalName = resumeOrignal;
    }
    await user.save();
    const updatedUser = {
        UserId: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        resume: user.resume,
        resumeOriginalName: user.resumeOriginalName,
        skills: user.skills,
    };
    console.log('updatedUser:', updatedUser);
    return res.status(200).json({
        message: "Profile Updated Successfully",
        updatedUser,
        success: true,
    });
});
//--------------------------------------GET USER BY ID ------------------
export const getUserbyId = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    console.log("id:", id);
    const user = await User.findById(id).select([
        "fullName",
        "email",
        "role",
        "phoneNumber",
        "profile",
    ]);
    if (!user)
        return next(new ErrorHandler("Invalid user Id", 404));
    return res.status(200).json({
        success: true,
        user,
    });
});
