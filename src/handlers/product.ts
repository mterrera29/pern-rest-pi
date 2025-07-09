import { Request, Response } from 'express';
import Product from '../models/Product.model';
import { UpdatedAt } from 'sequelize-typescript';

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
