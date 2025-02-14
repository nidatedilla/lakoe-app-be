import axios from 'axios';
import { BITESHIP_API_KEY, BITESHIP_BASE_URL } from '../config/biteship';

export const searchAreasFromBiteship = async (
  input: string,
  type: string = 'single',
) => {
  try {
    const response = await axios.get(`${BITESHIP_BASE_URL}/v1/maps/areas`, {
      headers: {
        Authorization: `Bearer ${BITESHIP_API_KEY}`,
      },
      params: {
        countries: 'ID',
        input,
        type,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching areas from Biteship:', error);
    throw new Error('Failed to search areas');
  }
};
