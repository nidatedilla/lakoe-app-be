import { products } from "@prisma/client";
import prisma from "../utils/prisma";

export const getProductReposytory = async () => {
  return await prisma.products.findMany();
};

export const createProductRepository = async (product: products) => {
  return await prisma.products.create({
    data: {
      name: product.name,
     description: product.description,
     size: product.size,
     minimum_order: product.minimum_order,
     attachments: product.attachments,
     storeId: product.storeId,
    },
  });
};

export const findAllProductRepository = async () => {
  return await prisma.products.findMany({
    include: {
      store: true
    }
  });
}

export const findUniqueProductRepository = async (id: string) => {
  return await prisma.products.findUnique({
    where: { id },
  });
};  

export const updateProductRepository = async (id: string, product: products) => {
  return await prisma.products.update({
    where: { id },
    data: {
      name: product.name,
      description: product.description,
      size: product.size,
      minimum_order: product.minimum_order,
      attachments: product.attachments,
      storeId: product.storeId,
    },
  });
}