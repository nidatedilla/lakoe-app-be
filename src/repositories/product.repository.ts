import { products } from '@prisma/client';
import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export const findAllProductRepository = async () => {
  return await prisma.products.findMany({
    include: {
      store: true,
      categories: true,
    },
  });
};

export const findUniqueProductRepository = async (id: string) => {
  return await prisma.products.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  });
};

export const createProductRepository = async (
  product: Omit<products, 'id'>,
  categoryId: string | null,
) => {
  return await prisma.products.create({
    data: {
      ...product,
      size: product.size ?? undefined,
      // buat yang lain
      ...(categoryId && {
        categories: {
          create: {
            category: {
              connect: {
                id: categoryId,
              },
            },
          },
        },
      }),
    },
  });
};

export const updateProductRepository = async (
  id: string,
  product: Prisma.productsUpdateInput,
) => {
  return await prisma.products.update({
    where: { id },
    data: product,
  });
};

export const deleteProductRepository = async (id: string) => {
  await prisma.productCategories.deleteMany({
    where: { productId: id },
  });

  return await prisma.products.delete({
    where: { id },
  });
};

export const findProductsByIsActive = async (isActive: boolean) => {
  return await prisma.products.findMany({
    where: { is_active: isActive },
    include: {
      store: true,
      categories: true,
    },
  });
};
export const findProductByName = async (name: string) => {
  return await prisma.products.findMany({
    where: { name: { contains: name, mode: 'insensitive' } },
  });
};