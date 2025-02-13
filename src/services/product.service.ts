import { products } from '@prisma/client';
import * as productRepository from '../repositories/product.repository';
import { uploadToCloudinary } from './media.service';

export const getAllProductsService = async () => {
  return await productRepository.findAllProductRepository();
};

export const getProductByIdService = async (id: string) => {
  return await productRepository.findUniqueProductRepository(id);
};

export const createProductService = async (
  product: Omit<products, 'id'>,
  categoryId: string,
  file: Express.Multer.File,
) => {
  if (file) {
    const mediaUrl = await uploadToCloudinary(file);

    product.attachments = mediaUrl;
  }

  return await productRepository.createProductRepository(product, categoryId);
};

export const updateProductService = async (
  id: string,
  product: Omit<products, 'id'>,
) => {
  const updatedProductData = {
    ...product,
    // Jika property 'size' bernilai null, jadikan undefined
    size: product.size === null ? undefined : product.size,
    // Lakukan hal serupa untuk properti lain yang bermasalah jika diperlukan
  };

  return await productRepository.updateProductRepository(
    id,
    updatedProductData,
  );
};

export const deleteProductService = async (id: string) => {
  return await productRepository.deleteProductRepository(id);
};

export const getProductsByIsActiveService = async (isActive: boolean) => {
  return await productRepository.findProductsByIsActive(isActive);
};
