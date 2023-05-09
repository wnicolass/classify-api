"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();

require('./database');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeroutes = require('./routes/home.routes'); var _homeroutes2 = _interopRequireDefault(_homeroutes);
var _tokenroutes = require('./routes/token.routes'); var _tokenroutes2 = _interopRequireDefault(_tokenroutes);
var _userroutes = require('./routes/user.routes'); var _userroutes2 = _interopRequireDefault(_userroutes);
var _adroutes = require('./routes/ad.routes'); var _adroutes2 = _interopRequireDefault(_adroutes);
var _categoryroutes = require('./routes/category.routes'); var _categoryroutes2 = _interopRequireDefault(_categoryroutes);
var _subcategoryroutes = require('./routes/subcategory.routes'); var _subcategoryroutes2 = _interopRequireDefault(_subcategoryroutes);
var _errorHandler = require('./middlewares/errorHandler'); var _errorHandler2 = _interopRequireDefault(_errorHandler);
var _enableCors = require('./middlewares/enableCors'); var _enableCors2 = _interopRequireDefault(_enableCors);

exports. default = (function app() {
  const myApp = _express2.default.call(void 0, );
  return {
    app: myApp,
    middlewares: (function middlewares() {
      myApp.use(_enableCors2.default);
      myApp.use(_express2.default.urlencoded({ extended: true }));
      myApp.use(_express2.default.json());
    }()),
    routes: (function routes() {
      myApp.use('/', _homeroutes2.default);
      myApp.use('/token', _tokenroutes2.default);
      myApp.use('/users', _userroutes2.default);
      myApp.use('/ads', _adroutes2.default);
      myApp.use('/categories', _categoryroutes2.default);
      myApp.use('/subcategories', _subcategoryroutes2.default);
      myApp.use(_errorHandler2.default);
    }()),
  };
}());
