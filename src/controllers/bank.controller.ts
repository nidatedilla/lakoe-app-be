import { Request, Response } from 'express';
import * as bankRepository from '../repositories/bank.repository';
import { getMeRepository } from '../repositories/user.repository';

export const createBank = async (req: Request, res: Response) => {
  const { bank, acc_num, acc_name } = req.body;
  const id = res.locals.user.id;
  try {
    const store_id = await getMeRepository(id);
    if (!store_id) {
      res.status(404).json({ error: 'Store not found' });
      return;
    }

    console.log(store_id);

    const storeId = store_id.stores?.id;

    if (!bank || !acc_num || !acc_name) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    if (!storeId) {
      res.status(404).json({ error: 'Store not found' });
      return;
    }

    const createBank = await bankRepository.createBankrepository({
      id: id,
      bank,
      storeId,
      acc_num,
      acc_name,
      userId: id
    });

    res.status(201).json(createBank);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findAllBank = async (req: Request, res: Response) => {
  try {
    const banks = await bankRepository.findAllBankrepository();
    res.status(200).json(banks);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findBankById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const bank = await bankRepository.findBankByIdrepository(id);
    if (!bank) {
      res.status(404).json({ error: 'Bank not found' });
      return;
    }
    res.status(200).json(bank);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};


export const deleteBank = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const bank = await bankRepository.findBankByIdrepository(id);
    if (!bank) {
      res.status(404).json({ error: 'Bank not found' });
      return;
    }
    const deletedBank =  await bankRepository.deleteBankrepository(id);
    res.status(200).json(deletedBank);
    
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};
