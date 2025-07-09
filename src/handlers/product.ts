import { Request, Response } from 'express';
import Product from '../models/Product.model';
const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.json({ data: product });
};

export default createProduct;
