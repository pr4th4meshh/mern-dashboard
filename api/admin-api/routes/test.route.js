// routes/testRoutes.js
import express from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin', verifyToken(['admin', 'superadmin']), (req, res) => {
  res.status(200).json({ message: 'Hello Admin or Superadmin' });
});

router.get('/superadmin', verifyToken(['superadmin']), (req, res) => {
  res.status(200).json({ message: 'Hello Superadmin' });
});

router.get('/developer', verifyToken(['developer', 'admin', 'superadmin']), (req, res) => {
  res.status(200).json({ message: 'Hello Developer, Admin, or Superadmin' });
});

export default router;
