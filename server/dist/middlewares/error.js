export const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Some Error From Backend Side";
    err.statusCode ||= 500;
    return res.status(err.statusCode).json({
        message: err.message,
        success: false
    });
};
export const TryCatch = (func) => {
    return (req, res, next) => {
        return Promise.resolve(func(req, res, next)).catch((next));
    };
};
