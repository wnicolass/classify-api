"use strict";Object.defineProperty(exports, "__esModule", {value: true});async function errorHandler(err, req, res, next) {
  console.error(err);
  console.log(err.message);
  return res.status(500).json({
    error: 'Something went wrong with the server',
  });
}

exports. default = errorHandler;
