import { stores } from '@prisma/client';
import * as storeRepository from '../repositories/store.repository';

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
};

export const fetchStoreWithProducts = async (domain: string) => {
  const store = await storeRepository.getStoreByDomain(domain);
  if (!store) throw new Error('Store not found');
  return store;
};

export const getStoreDomainByUserId = async (userId: string) => {
  return await storeRepository.getStoreDomainByUserIdRepo(userId);
};

export const getStoreLogoByDomain = async (domain: string) => {
  return await storeRepository.getStoreLogoByDomainRepo(domain);
};
