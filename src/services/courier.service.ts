import {
  fetchCouriersFromBiteship,
  findCourierById,
  getAllCouriers,
  updateCourierSelection,
  getSelectedCouriers,
  getCourierRatesRepository,
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

export const getCourierRatesService = async (
  origin: string,
  destination: string,
  couriers: string,
  items: any[],
) => {
  if (!origin || !destination || !couriers || !items.length) {
    throw new Error(
      'Missing required fields: origin, destination, couriers, or items',
    );
  }

  const requestData = {
    origin_area_id: origin,
    destination_area_id: destination,
    couriers,
    items,
  };

  return await getCourierRatesRepository(requestData);
};
