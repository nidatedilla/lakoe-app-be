import { products } from '@prisma/client';
import prisma from '../utils/prisma';

export const findAllProductRepository = async () => {
  return await prisma.products.findMany({
    include: {
      store: true,
    },
  });
};

export const findUniqueProductRepository = async (id: string) => {
  return await prisma.products.findUnique({
    where: { id },
  });
};

export const createProductRepository = async (product: Omit<products, 'id'>, categoryId: string) => {
  return await prisma.products.create({
    data: {
      name: product.name,
      description: product.description,
      size: product.size,
      minimum_order: product.minimum_order,
      attachments: product.attachments,
      is_active: product.is_active,
      store: {
        connect: {
          id: product.storeId,
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: {
                id: categoryId,
              },
            },
          },
        ],
      },
    },
  });
};

export const updateProductRepository = async (id: string, product: Omit<products, 'id'>) => {
  return await prisma.products.update({
    where: { id },
    data: {
      name: product.name,
      description: product.description,
      size: product.size,
      minimum_order: product.minimum_order,
      attachments: product.attachments,
      is_active: product.is_active,
      categoryId: product.categoryId,
    },
  });
};

export const deleteProductRepository = async (id: string) => {
  return await prisma.products.delete({
    where: { id },
  });
};

export const activeProductRepository = async (id: string) => {
  return await prisma.products.findMany({
    where: {
      is_active: true,
    },
  })
}