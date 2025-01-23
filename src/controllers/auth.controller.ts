import { Request, Response } from "express";
import * as authServices from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user = await authServices.registerUser(body);

    res.status(201).json({
      message: "register berhasil",
      user,
    });
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {

  const {body} = req;

  try {
    const user = await authServices.loginUser(body)

    res.json({
      user,
    });
    
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
}