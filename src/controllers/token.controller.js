import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../database';

export default (function tokenController() {
  return {
    async store(req, res) {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Invalid credentials',
        });
      }

      const admin = await models.AdminAccount.findOne({
        where: { email },
      });

      if (!admin) {
        return res.status(404).json({
          error: `Admin with email ${email} does not exist`,
        });
      }

      if (!(await bcrypt.compare(password, admin.password_hash))) {
        return res.status(401).json({
          error: 'Invalid credentials',
        });
      }

      const { id } = admin;
      const payload = { id, email };
      const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY_DATE },
      );
      return res.status(200).json({ token });
    },
  };
}());
