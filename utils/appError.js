//app error
const appError = (message, statusCode) => {
    let error = new Error(message);
    error.statusCode = statusCode ? statusCode : 500;
    error.stack = error.stack;
    return error;
};

module.exports = appError;