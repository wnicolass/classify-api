"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function enableCors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', [
    'GET',
    'POST',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ]);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
} exports.default = enableCors;
