import { Request, Response } from 'express';
import Product from '../models/Product.model';
export const createProduct = async (req: Request, res: Response) => {
  const product = new Product(req.body);
  const saveProduct = await product.save();
  res.json({ data: saveProduct });
};
