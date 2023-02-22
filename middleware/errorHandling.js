module.exports = class GlobalErrorHandler extends Error {
  constructor(errorMessage, statusCode) {
    super(errorMessage);
    this.errorMessage = errorMessage?.toString();
    this.statusCode = statusCode;
  }

  getErrorObject() {
    if (process.env.NODE_ENV === "development") {
      return {
        message: this.errorMessage,
        error: this.message,
        statusCode: this.statusCode,
        stack: this.stack.split("\n"),
        name: this.name,
        data: [],
        status: false,
      };
    }
    return {
      error: this.errorMessage,
      statusCode: this.statusCode,
      data: [],
      status: false,
    };
  }
};
