import { Request, Response } from "express";
import colors from 'colors';
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt', 'avaliability']}
        });
        res.json({ data: products });
    } catch (error) {
        console.log(colors.bgRed.bold(`There was an error getting the products: ${error}`));
        
    }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 

    const product = await Product.findByPk(id);
    
    if(!product) {
      res.status(404).json({
        error: "Product not found"
      });
      return;
    }


    res.json({ data: product })
  } catch (error) {
    console.log(
      colors.bgRed.bold(`There was an error getting the products: ${error}`)
    );
  }
};

export const createProduct = async (req: Request, res: Response) => {

    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    } catch (error) {
        console.log(colors.bgRed.bold(`There was an errror creating the product: ${error}`));
        
    }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
      res.status(404).json({
        error: "Product not found"
      });
      return;
    }


    // Update the product
    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (error) {
    console.log(colors.bgRed.bold(`There was an error updating the product: ${error}`))
  }
}

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }
    
    await product.update({
      availability: !product.dataValues.availability
    });

    res.json({ data: product });
  } catch (error) {
    console.log(
      colors.bgRed.bold(`There was an error updating the product: ${error}`)
    );
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if(!product) {
      res.status(404).json({
        error: "Product not found"
      })
    }

    await product.destroy();

    res.json({ data: 'The product was eliminated' });
  } catch (error) {
    console.log(colors.bgRed.bold(`There was an error deleting the product: ${error}`))
  }
}