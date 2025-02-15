import axios from 'axios';
import {
  fetchCouriersFromBiteship,
  findCourierById,
  getAllCouriers,
  updateCourierSelection,
  getSelectedCouriers,
} from '../repositories/courier.repository';

export const getCouriers = async () => {
  return await fetchCouriersFromBiteship();
};

export const fetchAllCouriers = async () => {
  return await getAllCouriers();
};

export const toggleCourierSelection = async (courierId: string) => {
  try {
    const courier = await findCourierById(courierId);
    if (!courier) {
      throw new Error('Courier not found');
    }

    const updatedCourier = await updateCourierSelection(
      courierId,
      !courier.is_selected,
    );

    return updatedCourier;
  } catch (error) {
    console.error('Error toggling courier selection:', error);
    throw error;
  }
};

export const getAllSelectedCouriers = async () => {
  try {
    return await getSelectedCouriers();
  } catch (error) {
    console.error('Error getting selected couriers:', error);
    throw error;
  }
};
