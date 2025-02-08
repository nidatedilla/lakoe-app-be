import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { getUniqueUserByIdRepository } from '../repositories/user.repository';

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
  const userId = res.locals.user.id;

  try {
    let {
      name,
      description,
      size,
      minimum_order,
      url,
      stock,
      price,
      weight,
      attachments,
      categoryId,
      sku,
      variant,
    } = req.body;

    const file = req.file as Express.Multer.File;

    const findUniqueUserById = await getUniqueUserByIdRepository(userId);

    if (!findUniqueUserById) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (findUniqueUserById.id !== userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const storeId = findUniqueUserById.stores?.id || '';

    // Parsing data variant yang dikirim dari frontend (bisa berupa string JSON)
    let variantData: any[] = [];
    if (variant) {
      if (typeof variant === 'string') {
        variantData = JSON.parse(variant);
      } else {
        variantData = variant;
      }
    }

    // Pastikan data varian hanya memiliki field yang didefinisikan di model variants.
    // Misalnya, jika ada properti "name", kita hapus atau abaikan.
    const transformedVariantData = variantData.map((v) => ({
      combination: v.combination, // Harus berupa objek atau JSON
      price: parseInt(v.price, 10),
      sku: v.sku,
      stock: parseInt(v.stock, 10),
      weight: parseInt(v.weight, 10),
      photo: v.photo,
    }));

    // Buat object product
    const product = {
      name,
      description,
      url,
      size: parseInt(size, 10),
      minimum_order: parseInt(minimum_order, 10),
      attachments,
      storeId,
      sku,
      weight: parseInt(weight, 10),
      is_active: true,
      categoryId: categoryId || null,
      stock: parseInt(stock, 10),
      price: parseInt(price, 10),
      variant: {
        create: transformedVariantData,
      },
    };

    const newProduct = await productService.createProductService(
      product,
      categoryId,
      file,
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

    let {
      name,
      description,
      size,
      url,
      weight,
      minimum_order,
      attachments,
      storeId,
      is_active,
      sku,
      categoryId,
      stock,
      price,
    } = req.body;

    const product = {
      name,
      description,
      size,
      url,
      weight,
      minimum_order,
      attachments,
      storeId,
      is_active,
      categoryId,
      stock,
      sku,
      price,
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
export const getProductsByIsActiveController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { isActive } = req.params;
    const products = await productService.getProductsByIsActiveService(
      isActive === 'true',
    );
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};
