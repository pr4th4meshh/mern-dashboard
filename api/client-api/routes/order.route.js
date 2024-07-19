import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/:orderId/status', getOrderStatus);
router.patch('/:orderId/updateStatus', updateOrderStatus);
router.get('/all', getAllOrders)

export default router;