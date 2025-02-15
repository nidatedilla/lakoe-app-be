import axios from 'axios';
import { Request, Response } from 'express';
import * as locationRepository from '../repositories/location.repository';
import * as storeRepository from '../repositories/store.repository';
import { searchAreasFromBiteship } from '../repositories/area.repository';

const BITESHIP_API_KEY = process.env.BITESHIP_API_KEY;
const BITESHIP_API_URL = 'https://api.biteship.com/v1/locations';

const axiosInstance = axios.create({
  baseURL: BITESHIP_API_URL,
  headers: {
    Authorization: `Bearer ${BITESHIP_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const getAllLocationController = async (req: Request, res: Response) => {
  try {
    const allLocation = await locationRepository.getAllLocationRepository();
    res.status(200).json(allLocation);
  } catch (error: any) {
    console.error('Error fetching all locations:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createLocationController = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const {
    name,
    address,
    postal_code,
    city_district,
    latitude,
    provinces,
    regencies,
    districts,
    villages,
    longitude,
    is_main_location,
    storeId,
    profileId,
    type,
    guestId,
  } = req.body;

  try {
    const findUniqueStore =
      await storeRepository.findUniqueStoreLocationRepository(storeId);

    if (!findUniqueStore) {
      res.status(400).json({ message: 'Store  does not exist!' });
      return;
    }

    const numPhone = findUniqueStore.user.phone;
    const nameContact = findUniqueStore.user.name;

    const areaSearchResult = await searchAreasFromBiteship(
      postal_code.toString(),
      'single',
    );

    if (!areaSearchResult || !areaSearchResult.areas?.length) {
      return res
        .status(400)
        .json({ message: 'Area ID not found for given postal code' });
    }

    const area_id = areaSearchResult.areas[0].id;

    console.log('Creating location with data:', {
      name,
      address,
      postal_code,
      city_district,
      provinces,
      regencies,
      districts,
      villages,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      is_main_location,
      storeId,
      profileId,
      contact_name: nameContact,
      contact_phone: numPhone,
      type,
      area_id,
      guestId,
    });

    const isExsitingLocation = findUniqueStore.locations;

    const response = await axiosInstance.post('/', {
      name,
      address,
      postal_code,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      is_main_location: isExsitingLocation ? false : true,
      contact_name: nameContact,
      contact_phone: numPhone,
      type,
    });

    console.log('Biteship response:', response.data);

    const location = await locationRepository.createLocationRepository({
      id: response.data.id,
      name,
      address,
      postal_code,
      provinces,
      regencies,
      districts,
      villages,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      is_main_location: isExsitingLocation ? false : true,
      storeId,
      profileId,
      contact_name: nameContact,
      contact_phone: numPhone,
      type,
      area_id,
      guestId,
    });

    console.log('create location : ', location);

    res.status(201).json(location);
  } catch (error: any) {
    console.error(
      'Error creating location:',
      error.response ? error.response.data : error.message,
    );
    res.status(500).json({ message: error.message });
  }
};

export const getUniqueLocationController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const location = await locationRepository.getUniqueLocationRepository(id);
    res.status(200).json(location);
  } catch (error: any) {
    console.error('Error fetching location:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateLocationController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    address,
    postal_code,
    provinces,
    regencies,
    districts,
    villages,
    latitude,
    longitude,
    is_main_location,
    storeId,
    profileId,
    contact_name,
    contact_phone,
    type,
    guestId,
  } = req.body;

  try {
    console.log('Updating location with data:', {
      name,
      address,
      postal_code,
      city_district: { provinces, regencies, districts, villages },
      latitude: latitude?.toString(),
      longitude: longitude?.toString(),
      is_main_location,
      contact_name,
      contact_phone,
      type,
      guestId,
    });

    const city_district = `${provinces}, ${regencies}, ${districts}, ${villages}`;

    const areaSearchResult = await searchAreasFromBiteship(
      postal_code,
      'single',
    );

    if (!areaSearchResult || !areaSearchResult.areas?.length) {
      return res
        .status(400)
        .json({ message: 'Area ID not found for given postal code' });
    }

    const area_id = areaSearchResult.areas[0].id;

    // const response = await axiosInstance.patch(`/${id}`, {
    //   name,
    //   address,
    //   postal_code,
    //   city_district,
    //   latitude: parseFloat(latitude),
    //   longitude: parseFloat(longitude),
    //   is_main_location,
    //   contact_name,
    //   contact_phone,
    //   type,
    // });

    // console.log('Biteship response:', response.data);

    const location = await locationRepository.updateLocationRepository({
      id,
      name,
      address,
      postal_code,
      provinces,
      regencies,
      districts,
      villages,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      is_main_location,
      storeId,
      profileId,
      contact_name,
      contact_phone,
      type,
      area_id,
      guestId,
    });

    res.status(200).json(location);
  } catch (error: any) {
    console.error(
      'Error updating location:',
      error.response ? error.response.data : error.message,
    );
    res
      .status(500)
      .json({ message: error.response?.data?.message || error.message });
  }
};

export const deleteLocationController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await axiosInstance.delete(`/${id}`);
    await locationRepository.deleteLocationRepository(id);
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting location:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createBuyerLocation = async (req: Request, res: Response) => {
  const {
    name,
    address,
    postal_code,
    city_district,
    latitude,
    provinces,
    regencies,
    districts,
    villages,
    longitude,
    is_main_location,
    storeId,
    profileId,
    type,
    contact_phone,
    contact_name,
    guestId,
  } = req.body;

  try {
    console.log('Creating location with data:', {
      name,
      address,
      postal_code,
      city_district,
      provinces,
      regencies,
      districts,
      villages,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      is_main_location,
      storeId,
      profileId,
      contact_name,
      contact_phone,
      type,
      guestId,
    });

    const areaSearchResult = await searchAreasFromBiteship(
      postal_code.toString(),
      'single',
    );

    if (!areaSearchResult || !areaSearchResult.areas?.length) {
      return res
        .status(400)
        .json({ message: 'Area ID not found for given postal code' });
    }

    const area_id = areaSearchResult.areas[0].id;

    const response = await axiosInstance.post('/', {
      name,
      address,
      postal_code,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      is_main_location: true,
      contact_name,
      contact_phone,
      type,
    });

    console.log('Biteship response:', response.data);

    const location = await locationRepository.createBuyerLocationRepository({
      id: response.data.id,
      name,
      address,
      postal_code,
      provinces,
      regencies,
      guestId,
      districts,
      villages,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      is_main_location: false,
      storeId: undefined,
      profileId: undefined,
      contact_name,
      contact_phone,
      type,
      area_id,
    });

    console.log('create location : ', location);
    console.log('guest id:', guestId);

    res.status(201).json(location);
  } catch (error: any) {
    console.error(
      'Error creating location:',
      error.response ? error.response.data : error.message,
    );
    res.status(500).json({ message: error.message });
  }
};

export const getGuestLocation = async (req: Request, res: Response) => {
  const guestId = req.params.guestId;

  console.log('Guest ID dari request:', guestId);

  if (!guestId) {
    res.status(400).json({ error: 'guestId is required' });
    return;
  }

  try {
    const guestLocations = await locationRepository.findGuestLocation(guestId);

    console.log('Lokasi yang ditemukan:', guestLocations);

    res.json(guestLocations);
  } catch (error) {
    console.error('Error fetching guest locations:', error);
    res.status(500).json({ error: 'Error fetching guest locations' });
    return;
  }
};
