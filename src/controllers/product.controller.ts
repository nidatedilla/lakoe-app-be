import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getProductController = async (req: Request, res: Response) => {
  try {
    const getAllProduct = await productService.getAllProductsService();
    res.status(200).json(getAllProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductByIdService(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      size,
      minimum_order,
      attachments,
      storeId,
      categoryId,
    } = req.body;

    const product = {
      name,
      description,
      size,
      minimum_order,
      attachments,
      storeId,
      is_active: true,
      categoryId,
    };

    const newProduct = await productService.createProductService(
      product,
      categoryId,
    );

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      size,
      minimum_order,
      attachments,
      storeId,
      is_active,
      categoryId,
    } = req.body;

    const product = {
      name,
      description,
      size,
      minimum_order,
      attachments,
      storeId,
      is_active,
      categoryId,
    };

    const updatedProduct = await productService.updateProductService(
      id,
      product,
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteProduct = await productService.deleteProductService(id);

    res
      .status(204)
      .json({ message: 'product deleted successfully', deleteProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};
