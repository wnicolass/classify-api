"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _dotenv = require('dotenv');

_dotenv.config.call(void 0, );

exports. default = {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: false,
    updatedAt: false,
  },
  dialectOptions: {
    timezone: 'Europe/Lisbon',
  },
  timezone: 'Europe/Lisbon',
};
