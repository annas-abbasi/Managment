const errorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports = errorHandler;


// const errorHandler = (StatusCode, errMessage) => {
//     const error = new Error('This is Funny!');
//     error.StatusCode = StatusCode;
//     return error;
// }

// module.exports = errorHandler;