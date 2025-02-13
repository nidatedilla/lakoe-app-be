import { stores } from '@prisma/client';
import prisma from '../utils/prisma';

export const getStoreRepository = async () => {
  return await prisma.stores.findMany({
    include: {
      user: true,
    },
  });
};

export const findUniqueStoreRepository = async (userId: string) => {
  return await prisma.stores.findUnique({
    where: { userId },
  });
};

export const updateStoreRepository = async (id: string, store: stores) => {
  return await prisma.stores.update({
    where: { id },
    data: {
      name: store.name,
      description: store.description,
      banner: store.banner,
      userId: store.userId,
    },
  });
};

export const deleteStoreRepository = async (id: string) => {
  return await prisma.stores.delete({
    where: {
      id,
    },
  });
};

export const uniqueStoreByName = async (name: string) => {
  return await prisma.stores.findUnique({
    where: {
      name,
    },
  });
};

export const findUniqueStoreByIdRepository = async (id: string) => {
  return await prisma.stores.findUnique({
    where: { id },
  });
};

export const getStoreByDomain = async (domain: string) => {
  return await prisma.stores.findUnique({
    where: { domain },
    include: { products: true },
  });
};
