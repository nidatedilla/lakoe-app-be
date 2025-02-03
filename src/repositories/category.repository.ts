import { categories } from '@prisma/client';
import prisma from '../utils/prisma';

export const findAllCategoriesRepository = async () => {
  return await prisma.categories.findMany();
};

export const findUniqueCategoryRepository = async (id: string) => {
  return await prisma.categories.findUnique({
    where: { id },
  });
};

export const createCategoryRepository = async (category: Omit<categories, 'id'>) => {
  return await prisma.categories.create({
    data: category,
  });
};

export const updateCategoryRepository = async (id: string, category: Omit<categories, 'id'>) => {
  return await prisma.categories.update({
    where: { id },
    data: category,
  });
};

export const deleteCategoryRepository = async (id: string) => {
  return await prisma.categories.delete({
    where: { id },
  });
};