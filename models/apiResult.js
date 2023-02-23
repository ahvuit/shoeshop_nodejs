class ApiResult {
  _success = true;
  _status = 200;
  _message = "OK";
  _data = {};

  constructor(success, status, message, data) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  get success() {
    return this._success;
  }
  set success(value) {
    this._success = value;
  }
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }
  get message() {
    return this._message;
  }
  set message(value) {
    this._message = value;
  }
  get data() {
    return this._data;
  }
  set data(value) {
    this._data = value;
  }
}

exports.ApiResult = ApiResult;
