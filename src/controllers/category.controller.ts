import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';

export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const getAllCategories = await categoryService.getAllCategoriesService();
    res.status(200).json(getAllCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const getCategoryByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryByIdService(id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const category = { name, parentId };
    const newCategory = await categoryService.createCategoryService(category);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, parentId } = req.body;
    const category = { name, parentId };
    const updatedCategory = await categoryService.updateCategoryService(id, category);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteCategory = await categoryService.deleteCategoryService(id);
    res.status(204).json({ message: 'Category deleted successfully', deleteCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};