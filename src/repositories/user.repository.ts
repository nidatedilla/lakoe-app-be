import { users } from '@prisma/client';
import prisma from '../utils/prisma';

export const getUsersRepository = async () => {
  return await prisma.users.findMany();
};

export const registerUserRepository = async (user: users) => {
  return await prisma.users.create({
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
      phone: user.phone,
      role: 'Seller',
    },
  });
};

export const findUniqueUserByEmailRepository = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};
export const findUniqueUserByPhoneNumberRepository = async (phone: number) => {
  return await prisma.users.findUnique({
    where: { phone },
  });
};

export const deleteUserRepository = async (id: string) => {
  return await prisma.users.delete({
    where: { id },
  });
};

export const getMeRepository = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      phone: true,
      profile: true
    },
  });
};
