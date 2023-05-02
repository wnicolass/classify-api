import jwt from 'jsonwebtoken';
import models from '../database';

export default async function checkLogin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: 'Login required',
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const admin = await models.AdminAccount.findOne({
      where: { id, email },
    });

    if (!admin) {
      return res.status(401).json({
        error: 'Invalid admin account',
      });
    }

    req.adminId = id;
    req.adminEmail = email;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
}
