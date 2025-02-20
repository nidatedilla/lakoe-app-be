import { Request, Response } from 'express';
import * as reqPaymentRepository from '../repositories/withdrawal.repository';
import { getUniqueUserByIdRepository } from '../repositories/user.repository';
import prisma from '../utils/prisma';

export const createReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  const { sellerId, storeId, amount } = req.body;
  console.log(` storeId: ${storeId}, sellerId: ${sellerId}`);

  try {
    const findUniqueUser = await getUniqueUserByIdRepository(sellerId);

    if (!findUniqueUser) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    if (findUniqueUser.balance === 0 || findUniqueUser.balance < amount) {
      res.status(400).json({ message: 'Saldo anda tidak cukup' });
      return;
    }

    if (!storeId) {
      res.status(400).json({ message: 'Please make a store first' });
      return;
    }

    if (amount < 20000) {
      res.status(400).json({ message: 'Withdrwal harus lebih dari 20.000' });
      return;
    }

    const data = {
      id: '',
      storeId,
      sellerId,
      status: 'Pending',
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await prisma.users.update({
      where: { id: findUniqueUser.id },
      data: {
        balance: findUniqueUser.balance - amount,
      },
    });

    const createReqPayment =
      await reqPaymentRepository.createReqPaymentRepository(data);

    if (!createReqPayment) {
      res.status(400).json({ message: "Can't create req payment" });
      return;
    }

    res.status(201).json(createReqPayment);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findPendingReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const findManyReqPendingPayment =
      await reqPaymentRepository.findPendingReqPaymentRepository();

    if (!findManyReqPendingPayment) {
      res.status(400).json({ message: "Can't find req pending payment" });
      return;
    }

    res.status(200).json(findManyReqPendingPayment);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const searchPendingReqPaymentsController = async (
  req: Request,
  res: Response,
) => {
  const { name } = req.query;

  try {
    const searchPending =
      await reqPaymentRepository.searchPendingReqPaymentsRepository(
        name as string,
      );

    if (!searchPending) {
      res.status(404).json({ message: 'can not find  pending seller' });
      return;
    }

    res.status(200).json(searchPending);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findProcessingReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const findManyReqProcessingPayment =
      await reqPaymentRepository.findProcessingReqPaymentRepository();

    if (!findManyReqProcessingPayment) {
      res.status(400).json({ message: "Can't find req Processing payment" });
      return;
    }

    res.status(200).json(findManyReqProcessingPayment);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const searchProcessingReqPaymentsController = async (
  req: Request,
  res: Response,
) => {
  const { name } = req.query;

  try {
    const searchProcessing =
      await reqPaymentRepository.searchProcessingReqPaymentsRepository(
        name as string,
      );

    if (!searchProcessing) {
      res.status(404).json({ message: 'can not find  Processing seller' });
      return;
    }

    res.status(200).json(searchProcessing);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findSuccessReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const findManyReqSuccessPayment =
      await reqPaymentRepository.findSuccessReqPaymentRepository();
    if (!findManyReqSuccessPayment) {
      res.status(400).json({ message: "Can't find req Success payment" });
      return;
    }

    res.status(200).json(findManyReqSuccessPayment);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const searchSuccessReqPaymentsController = async (
  req: Request,
  res: Response,
) => {
  const { name } = req.query;

  try {
    const searchSuccess =
      await reqPaymentRepository.searchSuccessReqPaymentsRepository(
        name as string,
      );

    if (!searchSuccess) {
      res.status(404).json({ message: 'can not find  Success seller' });
      return;
    }

    res.status(200).json(searchSuccess);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const findRejectedReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const findManyReqRejectedPayment =
      await reqPaymentRepository.findRejectedReqPaymentRepository();
    if (!findManyReqRejectedPayment) {
      res.status(400).json({ message: "Can't find req Rejected payment" });
      return;
    }
    res.status(200).json(findManyReqRejectedPayment);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};


export const searchRejectedReqPaymentsController = async (
  req: Request,
  res: Response,
) => {
  const { name } = req.query;

  try {
    const searchRejected =
      await reqPaymentRepository.searchRejectedReqPaymentsRepository(
        name as string,
      );

    if (!searchRejected) {
      res.status(404).json({ message: 'can not find  Rejected seller' });
      return;
    }

    res.status(200).json(searchRejected);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};


export const updateStatusToRejectedReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const withdrawRequest = await prisma.payment_requests.findUnique({
      where: { id },
    });

    if (!withdrawRequest) {
      res.status(400).json({ message: 'Withdraw request not found' });
      return;
    }

    const sellerBalance = await prisma.users.findUnique({
      where: { id: withdrawRequest.sellerId },
    });

    if (!sellerBalance) {
      res.status(400).json({ message: 'Seller not found' });
      return;
    }

    await prisma.users.update({
      where: { id: withdrawRequest.sellerId },
      data: {
        balance: sellerBalance.balance + withdrawRequest.amount,
      },
    });

    const updateStatusToRejected =
      await reqPaymentRepository.updateStatusToRejectedReqPaymentRepository(id);

    if (!updateStatusToRejected) {
      res.status(400).json({ message: "Can't update to Rejected payment" });
      return;
    }
    res.status(201).json(updateStatusToRejected);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const updateStatusToProcessingReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const updateStatusToProcessing =
      await reqPaymentRepository.updatedeStatusToProcessingReqPaymentRepository(
        id,
      );

    if (!updateStatusToProcessing) {
      res.status(400).json({ message: "Can't update to Processing payment" });
      return;
    }
    res.status(201).json(updateStatusToProcessing);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};
export const updateStatusToSuccessReqPaymentController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const withdrawRequest = await prisma.payment_requests.findUnique({
      where: { id },
    });

    if (!withdrawRequest) {
      res.status(400).json({ message: 'Withdraw request not found' });
      return;
    }

    const sellerBalance = await prisma.users.findUnique({
      where: { id: withdrawRequest.sellerId },
    });

    if (!sellerBalance) {
      res.status(400).json({ message: 'Seller not found' });
      return;
    }

    await prisma.users.update({
      where: { id: withdrawRequest.sellerId },
      data: {
        balance: sellerBalance.balance - withdrawRequest.amount,
      },
    });

    const updateStatusToSuccess =
      await reqPaymentRepository.updatedeStatusToSuccessReqPaymentRepository(
        id,
      );

    if (!updateStatusToSuccess) {
      res.status(400).json({ message: "Can't update to Success payment" });
      return;
    }
    res.status(201).json(updateStatusToSuccess);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};
