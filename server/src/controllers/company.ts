import { NextFunction, Response } from "express";
import fs, { PathLike } from 'fs';
import { TryCatch } from "../middlewares/error.js";
import { Company } from "../models/company.js";
import { CompanyReqBody, NewRequest } from "../types/allType.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const registerCompany = TryCatch(
  async (
    req: NewRequest<CompanyReqBody, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, discription,
      website } = req.body;
    const id = req.id;

    console.log('name:', name)
    const company = await Company.findOne({ name });

    if (company)
      return next(
        new ErrorHandler("Company Name Already Exist,Try Different One", 404)
      );

    const newCompany = await Company.create({
      name,
      discription,
      website,
      UserId: id,
    });
    return res.status(201).json({
      message: "Company Register Successfully",
      company: newCompany,
      success: true,
    });
  }
);

export const getCompaneis = TryCatch(
  async (req: NewRequest<{}, {}>, res, next) => {
    const UserId = req.id;

    const allComapanies = await Company.find({});
    if (!allComapanies) return next(new ErrorHandler("No Company Found", 404));

    return res.status(200).json({
      success: true,
      companies: allComapanies,
    });
  }
);


export const getCompanyById = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const company = await Company.findById(id)

  if (!company) return next(new ErrorHandler("Invalid Company Id or No Company Found", 404));

  return res.status(200).json({
    success: true,
    company
  })
});

export const updateCompany = TryCatch(async (req: NewRequest<CompanyReqBody, {}>, res, next) => {
  const { id } = req.params;
  const { name, discription, website, location } = req.body;

  const logo = req.file

  const cloud = await uploadOnCloudinary(logo?.path);
  if (logo?.path) {
    const deletedLogo = fs.unlinkSync(logo.path as PathLike)
    console.log("logo deleted", deletedLogo)
  }

  const updatedData = {
    name,
    discription,
    website,
    location,
    logo: cloud?.secure_url

  }
  const updatedCompany = await Company.findByIdAndUpdate(id, updatedData, { new: true });

  if (!updatedCompany) return next(new ErrorHandler("Company Not Found", 404));

  return res.status(201).json({
    message: "Company Information Updated",
    success: true,
    updatedCompany
  })
})