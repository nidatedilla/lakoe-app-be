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
    },
  });
};

export const findUniqueUserByEmailRepository = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};

export const findUniqueUserByRoleRepository = async (name: string) => {
  return await prisma.roles.findMany({
    where: { name },
  });
};
