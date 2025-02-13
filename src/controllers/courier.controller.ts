import { Request, Response } from 'express';
import {
  fetchAllCouriers,
  getAllSelectedCouriers,
  getCouriers,
  toggleCourierSelection,
} from '../services/courier.service';

export const getCourierData = async (req: Request, res: Response) => {
  try {
    const couriers = await getCouriers();
    res.status(200).json({ success: true, couriers });
  } catch (error) {
    console.error('Error in getCourierData:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve courier data' });
  }
};

export const getAllCouriers = async (req: Request, res: Response) => {
  try {
    const couriers = await fetchAllCouriers();
    res.json({ success: true, data: couriers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const toggleCourierSelections = async (req: Request, res: Response) => {
  try {
    const { courierId } = req.params;
    const updatedCourier = await toggleCourierSelection(courierId);

    res.status(200).json({
      success: true,
      message: 'Courier selection updated successfully',
      data: updatedCourier,
    });
  } catch (error: any) {
    console.error('Error in toggleCourierSelections:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update courier selection',
    });
  }
};

export const getSelectedCouriers = async (req: Request, res: Response) => {
  try {
    const selectedCouriers = await getAllSelectedCouriers();
    res.status(200).json({
      success: true,
      data: selectedCouriers,
    });
  } catch (error: any) {
    console.error('Error in getSelectedCouriers:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get selected couriers',
    });
  }
};
