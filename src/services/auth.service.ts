import bcrypt from 'bcrypt';
import { users } from '@prisma/client';
import * as userRepository from '../repositories/user.repository';
import { LoginSchema } from '../libs/loginSchema';
import jwt from "jsonwebtoken";

export const registerUser = async (user: users) => {
  console.log('Registering user:', user);
  const existedEmail = await userRepository.findUniqueUserByEmailRepository(
    user.email,
  );

  if (existedEmail) {
    throw new Error('Email already used');
  }
  console.log('Existed email:', existedEmail);

  user.password = await bcrypt.hash(user.password, 10);

  const existedPhoneNum = await userRepository.findUniqueUserByPhoneNumberRepository(user.phone)

  if (existedPhoneNum) {
    throw new Error('phone number already used');
  }
  console.log('Existed phone number:', existedPhoneNum);

  const registeredUser = await userRepository.registerUserRepository(user);

  console.log(registeredUser);

  return registeredUser;
};

export const registerAdmin = async (user: users) => {
  console.log('Registering admin:', user);
  const existedEmail = await userRepository.findUniqueUserByEmailRepository(
    user.email,
  );

  if (existedEmail) {
    throw new Error('Email already used');
  }
  console.log('Existed email:', existedEmail);

  user.password = await bcrypt.hash(user.password, 10);

  const existedPhoneNum = await userRepository.findUniqueUserByPhoneNumberRepository(user.phone)

  if (existedPhoneNum) {
    throw new Error('phone number already used');
  }
  console.log('Existed phone number:', existedPhoneNum);

  const registeredUser = await userRepository.registerAdminRepository(user);

  console.log(registeredUser);

  return registeredUser;
}

export const loginUser = async (LoginDTO: LoginSchema) => {
  const { email, password } = LoginDTO;

  const user = await userRepository.findUniqueUserByEmailRepository(email);
  if (!user) {
    throw new Error('Email or password is incorrect');
  };

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    throw new Error('Email or password is incorrect');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
  );

  return {
    token,
    user:{
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }}
};
