import axios from 'axios';
import { BITESHIP_API_KEY, BITESHIP_BASE_URL } from '../config/biteship';
import prisma from '../utils/prisma';

export const fetchCouriersFromBiteship = async () => {
  try {
    const response = await axios.get(`${BITESHIP_BASE_URL}/v1/couriers`, {
      headers: {
        Authorization: `Bearer ${BITESHIP_API_KEY}`,
      },
    });
    return response.data.couriers;
  } catch (error) {
    console.error('Error fetching courier data from Biteship:', error);
    throw new Error('Failed to fetch courier data');
  }
};

export const getAllCouriers = async () => {
  return await prisma.couriers.findMany();
};

export const findCourierById = async (courierId: string) => {
  return await prisma.couriers.findUnique({
    where: { id: courierId },
  });
};

export const updateCourierSelection = async (
  courierId: string,
  isSelected: boolean,
) => {
  try {
    return await prisma.couriers.update({
      where: { id: courierId },
      data: { is_selected: isSelected },
    });
  } catch (error) {
    console.error('Error updating courier selection:', error);
    throw new Error('Failed to update courier selection');
  }
};

export const getSelectedCouriers = async () => {
  try {
    return await prisma.couriers.findMany({
      where: { is_selected: true },
    });
  } catch (error) {
    console.error('Error getting selected couriers:', error);
    throw new Error('Failed to get selected couriers');
  }
};
