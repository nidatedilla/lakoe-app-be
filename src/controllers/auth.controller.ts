import { Request, Response } from 'express';
import * as authServices from '../services/auth.service';
import {getMeRepository} from '../repositories/user.repository';

export const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user = await authServices.registerUser(body);

    res.status(201).json(
      user);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await authServices.loginUser(body);

    console.log('user id: ', user.user.id);

    res.json(
      user,
    );
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const getMeCOntroller = async (req: Request, res: Response) => {
  const user = res.locals.user

  if(!user){
    res.status(401).json({message: "Unauthorized"})
    return
  }

  try {
    
    const me = await getMeRepository(user.id)

    res.status(200).json(me)
  } catch (error) {
    
  }
}
