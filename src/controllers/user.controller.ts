import { Prisma } from "@prisma/client";
import { Request, Response } from 'express';
import {
  findUniqueStoreByIdRepository,
  uniqueStoreByName
} from '../repositories/store.repository';
import { getUsersRepository } from '../repositories/user.repository';
import * as userService from '../services/user.service';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const getAllUser = await getUsersRepository();

    res.status(200).json(getAllUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = res.locals.user.id;

  if (!id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const userId = id;

    const deleteUser = await userService.deleteUserService(userId);

    res.status(201).json({ message: 'User deleted', deleteUser });

    return;
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const { body } = req;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const updateUser = await userService.updateUserService(body);

    res.status(201).json(updateUser);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};



export const updateStoreSellerController = async (req: Request, res: Response) => {
  const id = res.locals.user.id;

  if (!id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const { name, description, banner, logo, slogan } = req.body;

    const stores = {
      name,
      description,
      banner,
      logo,
      slogan,
      userId: id,
    };

    if (name) {
      const existingStore = await findUniqueStoreByIdRepository(id);
      if (existingStore && existingStore.name !== name) {
        const storeName = await uniqueStoreByName(name as string);
        if (storeName) {
           res.status(400).json({ message: "Store name already exists" })
           return
        }
      }
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const logoFile = files.logo?.[0];
    const bannerFile = files.banner?.[0];

    const updateStoreSeller = await userService.updateStoreSellerService(
      { id, stores },
      { logo: logoFile, banner: bannerFile }
    );

    res.status(200).json(updateStoreSeller);
  } catch (error: any) {
    console.log("Error:", error);

  
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
         res.status(400).json({ message: "Store name already exists" });
         return
      }
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
