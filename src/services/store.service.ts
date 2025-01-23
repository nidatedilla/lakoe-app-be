import { stores } from '@prisma/client';
import * as storeRepository from '../repositories/store.repository';

export const createStoreService = async (store: stores) => {
  return await storeRepository.createStoreRepository(store);
};

export const getStoreService = async () => {
  return await storeRepository.getStoreRepository();
};

export const findUniqueStoreService = async (id: string) => {
  return await storeRepository.findUniqueStoreRepository(id);
};

export const updateStoreService = async (id: string, store: stores) => {
  return await storeRepository.updateStoreRepository(id, store);
};

export const deleteStoreService = async (id: string) => {
  return await storeRepository.deleteStoreRepository(id);
}