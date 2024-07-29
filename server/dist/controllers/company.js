import { TryCatch } from "../middlewares/error.js";
import { Company } from "../models/company.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
export const registerCompany = TryCatch(async (req, res, next) => {
    const { name, discription, logo, website } = req.body;
    const id = req.id;
    const company = await Company.findOne({ name });
    if (company)
        return next(new ErrorHandler("Company Name Already Exist,Try Different One", 404));
    const newCompany = await Company.create({
        name,
        discription,
        logo,
        website,
        UserId: id,
    });
    return res.status(201).json({
        message: "Company Register Successfully",
        UserId: id,
        company: newCompany,
        success: true,
    });
});
export const getUserCompaneis = TryCatch(async (req, res, next) => {
    const UserId = req.id;
    const userCompanies = await Company.find({});
    if (!userCompanies)
        return next(new ErrorHandler("No Company Found", 404));
    return res.status(200).json({
        success: true,
        companies: userCompanies,
    });
});
export const getCompanyById = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company)
        return next(new ErrorHandler("Invalid Company Id or No Company Found", 404));
    return res.status(200).json({
        success: true,
        companyId: id,
        company
    });
});
export const updateCompany = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, discription, logo, website } = req.body;
    const updatedData = {
        name, discription, logo, website
    };
    const updatedCompany = await Company.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedCompany)
        return next(new ErrorHandler("Company Not Found", 404));
    return res.status(201).json({
        message: "Company Information Updated",
        success: true,
        updatedCompany
    });
});
