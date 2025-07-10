import { Router } from 'express';
import {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
} from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/products', getProduct);

router.get(
  '/products/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById
);

router.post(
  '/products',
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('price')
    .notEmpty()
    .withMessage('El nombre no puede ir vacio')
    .isNumeric()
    .withMessage('Valor no valido')
    .custom((value) => value > 0)
    .withMessage('Precio no valido'),
  handleInputErrors,
  createProduct
);

router.put('/products/:id', updateProduct);

router.patch('/', (req, res) => {
  res.json('desde put');
});

router.delete('/', (req, res) => {
  res.json('desde delete');
});

export default router;
