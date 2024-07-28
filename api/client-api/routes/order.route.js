import express from 'express';
import {
  createOrder,
  getAllOrders,
  getAllUserOrders,
  getOrderStatus,
  updateOrderStatus,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/:orderId/status', getOrderStatus);
router.patch('/:orderId/updateStatus', updateOrderStatus);
router.get('/all', getAllOrders)
router.get('/:id/allOrders', getAllUserOrders)

export default router;