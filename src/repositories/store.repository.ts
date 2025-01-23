import { stores } from "@prisma/client";
import prisma from "../utils/prisma";

export const createStoreRepository = async (store: stores) => {
  return await prisma.stores.create({
    data: {
      name: store.name,
      description: store.description,
      banner: store.banner,
      userId: store.userId,
    },
  });
}

export const getStoreRepository = async () => {
  return await prisma.stores.findMany({
    include: {
        user: true
    }
  });
};

export const findUniqueStoreRepository = async (id: string) => {
  return await prisma.stores.findUnique({
    where: { id },
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
}

export const deleteStoreRepository = async (id: string) => {
  return await prisma.stores.delete({where: {
    id
  }})
}