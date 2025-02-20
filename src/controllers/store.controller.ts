import * as storeService from '../services/store.service';
import { Request, Response } from 'express';
import { findUniqueStoreRepository } from '../repositories/store.repository';

export const getStoreController = async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreService();
    res.status(200).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findUniqueStoreController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const store = await storeService.findUniqueStoreService(id);
    res.status(200).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const updateStoreController = async (req: Request, res: Response) => {
  const id = res.locals.user.id;
  const { body } = req;
  try {
    const store = await storeService.updateStoreService(id, body);
    res.status(200).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteStoreController = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const findStoreId = await findUniqueStoreRepository(userId);
    console.log(findStoreId?.id);

    if (!findStoreId) {
      res.status(400).json({ message: 'Store does not exist' });
      return;
    }

    if (findStoreId.userId !== userId) {
      res.status(403).json({
        message: 'Forbidden: You do not have permission to delete this store',
      });
      return;
    }

    const deleteStore = await storeService.deleteStoreService(findStoreId.id);

    res.status(200).json({ message: 'Store deleted', deleteStore });
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const getStoreWithProducts = async (req: Request, res: Response) => {
  try {
    const { domain } = req.params;
    const storeData = await storeService.fetchStoreWithProducts(domain);
    res.json(storeData);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getStoreDomain = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const store = await storeService.getStoreDomainByUserId(userId);

    if (!store) {
      res.status(404).json({ message: 'Shop not found' });
      return;
    }

    res.json({ domain: store.domain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getLogoStore = async (req: Request, res: Response) => {
  try {
    const { domain } = req.params;

    const storeLogo = await storeService.getStoreLogoByDomain(domain);
    res.json(storeLogo);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
