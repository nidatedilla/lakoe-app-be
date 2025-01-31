import prisma from '../utils/prisma';
import { userStore } from '../types/user-store.type';
import { users } from '@prisma/client';

export const getUsersRepository = async () => {
  return await prisma.users.findMany({
    include: {
      stores: true,
    },
  });
};

export const registerUserRepository = async (user: users) => {
  return await prisma.users.create({
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
      phone: user.phone,
      role: user.role || 'Seller',
    },
  });
};

export const updateStoreSellerRepository = async (user: userStore) => {
  return await prisma.users.update({
    where: { id: user.id, role: 'Seller' },
    data: {
      stores: {
        upsert: {
          create: {
            name: user.stores?.name || '',
            description: user.stores?.description || '',
            banner: user.stores?.banner,
            logo: user.stores?.logo,
            slogan: user.stores?.slogan
          }, 
          update: {
            name: user.stores?.name || '',
            description: user.stores?.description || '',
            banner: user.stores?.banner,
            logo: user.stores?.logo,
            slogan: user.stores?.slogan,
          },
        },
      },
    },
    include: {
      stores: true,
    }
  });
};

export const registerAdminRepository = async (user: users) => {
  return await prisma.users.create({
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
      phone: user.phone,
      role: 'admin',
    },
  });
};

export const updateUserRepository = async (user: users) => {
  return await prisma.users.update({
    where: { id: user.id },
    data: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
  });
};

export const findUniqueUserByEmailRepository = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};
export const findUniqueUserByPhoneNumberRepository = async (phone: string) => {
  return await prisma.users.findUnique({
    where: { phone },
  });
};

export const deleteUserRepository = async (id: string) => {
  return await prisma.users.delete({
    where: { id },
  });
};

export const findUniqueUserByIdRepository = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
  });
}
export const getUniqueUserByIdRepository = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    include: {
      stores: true,
    }
  });
}

export const getMeRepository = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      phone: true,
      profile: true,
      stores: {
        select: {
          banner: true,
          name: true,
          id:true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          products: true,
          _count: {
            select: {
              products: true
            }
          }
        },
        
      },
    },
  });
};
