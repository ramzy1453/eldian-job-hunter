import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = () => {
  return (error, req, res, next) => {
    const defaultError = {
      statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong, try again later",
    };
    if (error.name == "ValidationError") {
      defaultError.statusCode = StatusCodes.BAD_REQUEST;
      defaultError.message = Object.values(error.errors)
        .map((item) => item.message)
        .join(", ");
    } else if (error.code && error.code === 11000) {
      defaultError.statusCode = StatusCodes.BAD_REQUEST;
      defaultError.message = `${Object.keys(
        error.keyValue
      )} field has to be unique`;
    } else {
      defaultError.message = error.message;
    }
    res.status(defaultError.statusCode).json({
      error: defaultError,
    });
  };
};

export default errorHandlerMiddleware;
