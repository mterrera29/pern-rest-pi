import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvaibility,
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

router.put(
  '/products/:id',
  param('id').isInt().withMessage('ID no válido'),
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('price')
    .notEmpty()
    .withMessage('El nombre no puede ir vacio')
    .isNumeric()
    .withMessage('Valor no valido')
    .custom((value) => value > 0)
    .withMessage('Precio no valido'),
  body('availability').isBoolean().withMessage('No puede ir vacio'),
  handleInputErrors,
  updateProduct
);

router.patch(
  '/products/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  updateAvaibility
);

router.delete(
  '/products/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
);

export default router;
