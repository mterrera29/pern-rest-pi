import { Router } from 'express';
import createProduct from './handlers/product';

const router = Router();

router.get('/', (req, res) => {
  res.json('desde get');
});

router.post('/products', createProduct);

router.put('/', (req, res) => {
  res.json('desde put');
});

router.patch('/', (req, res) => {
  res.json('desde put');
});

router.delete('/', (req, res) => {
  res.json('desde delete');
});

export default router;
