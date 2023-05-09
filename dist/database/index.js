"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _initmodels = require('../models/init-models'); var _initmodels2 = _interopRequireDefault(_initmodels);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const connection = new (0, _sequelize.Sequelize)(_database2.default);
const models = _initmodels2.default.call(void 0, connection);

exports. default = models;
