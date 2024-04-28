const router = require('express').Router();
const {createOrder, getOrder, updateOrder} = require('./order.controller');

router.post('/', createOrder);
router.get('/', getOrder);
router.patch('/', updateOrder);

module.exports = router;