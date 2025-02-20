import { bank_accounts } from '@prisma/client';
import prisma from '../utils/prisma';

export const createBankrepository = async (bank: bank_accounts) => {
  const existingBank = await prisma.bank_accounts.findUnique({
    where: {
      userId: bank.userId,
    },
  });

  if (existingBank) {
    return await prisma.bank_accounts.update({
      where: {
        userId: bank.userId,
      },
      data: {
        bank: bank.bank,
        acc_name: bank.acc_name,
        acc_num: bank.acc_num,
      },
    });
  } else {
    return await prisma.bank_accounts.create({
      data: {
        bank: bank.bank,
        userId: bank.userId,
        acc_name: bank.acc_name,
        acc_num: bank.acc_num,
        storeId: bank.storeId,
      },
    });
  }
};

export const findAllBankrepository = async () => {
  return await prisma.bank_accounts.findMany();
};

export const findBankByIdrepository = async (userId: string) => {
  return await prisma.bank_accounts.findUnique({
    where: {
      userId,
    },
  });
};

export const deleteBankrepository = async (id: string) => {
  return await prisma.bank_accounts.delete({
    where: {
      id,
    },
  });
};
