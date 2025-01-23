import * as storeService from '../services/store.service';
import { Request, Response } from 'express';
import {findUniqueStoreRepository} from '../repositories/store.repository'

export const createStoreController = async (req: Request, res: Response) => {
    const { body } = req;
    const user = res.locals.user; 

    if(!user){
        res.status(401).json({message: "Unauthorized"})
        return
    }   
  try {
  
    body.userId = user.id;
    const store = await storeService.createStoreService(body);

    console.log(store)

    res.status(201).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
}


export const getStoreController = async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreService();

    res.status(200).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
}

export const findUniqueStoreController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const store = await storeService.findUniqueStoreService(id);

    res.status(200).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
}

export const updateStoreController = async (req: Request, res: Response) => {
  const  id  = res.locals.user.id
  const { body } = req;
  try {
    const store = await storeService.updateStoreService(id, body);

    res.status(200).json(store);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
}
export const deleteStoreController = async (req: Request, res: Response) => {

  const  id  = res.locals.user.id

  if (!id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {

    const findStoreId = await findUniqueStoreRepository(id)

    console.log(findStoreId)

    if(!findStoreId){
      res.status(400).json({ message: 'store does not exist' });
      return;
    }

    const storeId = findStoreId.id

    if(id !== storeId){
      res.status(401).json({ message: 'Unauthorized' });
      return;
  
    }
    
    const deleteStore = await storeService.deleteStoreService(storeId);

    res.status(200).json({ message: "Store deleted", deleteStore });
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
}