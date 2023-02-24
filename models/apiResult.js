class ApiResult {

  constructor(success, status, message, data) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
  }
  
}

module.exports = ApiResult;
