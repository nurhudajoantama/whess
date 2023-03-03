const successResponse = (message = "Success", data = {}) => {
  return {
    status: "success",
    message,
    data,
  };
};

const errorResponse = (message = "Error", errors = {}) => {
  return {
    status: "error",
    message,
    errors,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
