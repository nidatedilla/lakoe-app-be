import { users } from '@prisma/client';
import * as userRepository from '../repositories/user.repository';
import { userStore } from '../types/user-store.type';
import { uploadToCloudinary } from './media.service';

export const deleteUserService = async (id: string) => {
  return await userRepository.deleteUserRepository(id);
};

export const updateUserService = async (user: users) => {
  return await userRepository.updateUserRepository(user);
};

export const updateStoreSellerService = async (
  user: userStore,
  files?: {logo?: Express.Multer.File, banner?: Express.Multer.File}
) => {
  if (files?.logo) {
    const logUrl = await uploadToCloudinary(files.logo);
    if(user.stores){
      user.stores.logo = logUrl 
    }
  }

  if (files?.banner) {
    const banUrl = await uploadToCloudinary(files.banner);
    if(user.stores){
      user.stores.banner = banUrl
    }
  }

  return await userRepository.updateStoreSellerRepository(user);
};

export const getUserByIdService = async (id: string) => {
  return await userRepository.findUniqueUserByIdRepository(id);
}

