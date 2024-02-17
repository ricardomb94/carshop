const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Send the error response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };





// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// const errorHandler = (err, req, res, next) => {
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   let message = err.message;

//   // If Mongoose not found error, set to 404 and change message
//   if (err.name === "CastError" && err.kind === "ObjectId") {
//     statusCode = 404;
//     message = "Resource not found";
//   }

//   /*This par of the code cause the "Error ([ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client") due to multiple res in the same function*/

//   res.status(statusCode).json({
//     message: message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// };

// export { notFound, errorHandler };
