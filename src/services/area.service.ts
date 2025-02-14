import { searchAreasFromBiteship } from '../repositories/area.repository';

export const searchAreas = async (
  searchInput: string,
  type: string = 'single',
) => {
  try {
    if (!searchInput) {
      throw new Error('Search input is required');
    }

    const areas = await searchAreasFromBiteship(searchInput, type);
    return areas;
  } catch (error) {
    console.error('Error in searchAreas service:', error);
    throw error;
  }
};
