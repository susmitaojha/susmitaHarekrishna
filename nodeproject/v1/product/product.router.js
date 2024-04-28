const router = require('express').Router();
const {createProduct, getProduct, getProductById, updateProductById, deleteByProductId} = require('./product.controller');
router.post('/', createProduct);
router.get('/', getProduct);
router.get('/:id',getProductById);
router.patch('/', updateProductById);
router.delete('/:id', deleteByProductId);
module.exports = router;