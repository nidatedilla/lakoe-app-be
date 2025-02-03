import { categories } from '@prisma/client';
import * as categoryRepository from '../repositories/category.repository';

export const getAllCategoriesService = async () => {
  return await categoryRepository.findAllCategoriesRepository();
};

export const getCategoryByIdService = async (id: string) => {
  return await categoryRepository.findUniqueCategoryRepository(id);
};

export const createCategoryService = async (category: Omit<categories, 'id'>) => {
  return await categoryRepository.createCategoryRepository(category);
};

export const updateCategoryService = async (id: string, category: Omit<categories, 'id'>) => {
  return await categoryRepository.updateCategoryRepository(id, category);
};

export const deleteCategoryService = async (id: string) => {
  return await categoryRepository.deleteCategoryRepository(id);
};