"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuestLocation = exports.createBuyerLocation = exports.deleteLocationController = exports.updateLocationController = exports.updateIsMainLocation = exports.getUniqueLocationController = exports.createLocationController = exports.getAllLocationController = void 0;
const axios_1 = __importDefault(require("axios"));
const locationRepository = __importStar(require("../repositories/location.repository"));
const storeRepository = __importStar(require("../repositories/store.repository"));
const area_repository_1 = require("../repositories/area.repository");
const user_repository_1 = require("../repositories/user.repository");
const BITESHIP_API_KEY = process.env.BITESHIP_API_KEY;
const BITESHIP_API_URL = 'https://api.biteship.com/v1/locations';
const axiosInstance = axios_1.default.create({
    baseURL: BITESHIP_API_URL,
    headers: {
        Authorization: `Bearer ${BITESHIP_API_KEY}`,
        'Content-Type': 'application/json',
    },
});
const getAllLocationController = async (req, res) => {
    try {
        const allLocation = await locationRepository.getAllLocationRepository();
        res.status(200).json(allLocation);
    }
    catch (error) {
        console.error('Error fetching all locations:', error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getAllLocationController = getAllLocationController;
const createLocationController = async (req, res) => {
    const { name, address, postal_code, city_district, latitude, provinces, regencies, districts, villages, longitude, is_main_location, storeId, profileId, type, guestId, } = req.body;
    try {
        const findUniqueStore = await storeRepository.findUniqueStoreLocationRepository(storeId);
        if (!findUniqueStore) {
            res.status(400).json({ message: 'Store does not exist!' });
            return;
        }
        const numPhone = findUniqueStore.user.phone;
        const nameContact = findUniqueStore.user.name;
        const existingLocations = findUniqueStore.locations;
        const isFirstLocation = existingLocations.length === 0;
        const areaSearchResult = await (0, area_repository_1.searchAreasFromBiteship)(postal_code.toString(), 'single');
        if (!areaSearchResult || !areaSearchResult.areas?.length) {
            res
                .status(400)
                .json({ message: 'Area ID not found for given postal code' });
            return;
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
            is_main_location: isFirstLocation ? true : is_main_location,
            storeId,
            profileId,
            contact_name: nameContact,
            contact_phone: numPhone,
            type,
            area_id,
            guestId,
        });
        const response = await axiosInstance.post('/', {
            name,
            address,
            postal_code,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            is_main_location: isFirstLocation ? true : false,
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
            is_main_location: isFirstLocation ? true : is_main_location,
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
    }
    catch (error) {
        console.error('Error creating location:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.createLocationController = createLocationController;
const getUniqueLocationController = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await locationRepository.getUniqueLocationRepository(id);
        res.status(200).json(location);
    }
    catch (error) {
        console.error('Error fetching location:', error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getUniqueLocationController = getUniqueLocationController;
const updateIsMainLocation = async (req, res) => {
    const { id } = req.params;
    const userId = res.locals.user.id;
    const { is_main_location } = req.body;
    console.log('userID', userId);
    try {
        if (!userId) {
            res.status(400).json({ message: 'user id is undefined' });
            return;
        }
        const updateLocationToFalse = await (0, user_repository_1.getMeRepository)(userId);
        const storeId = updateLocationToFalse?.stores?.id;
        if (!storeId) {
            res.status(400).json({ message: 'Store id is undefined' });
            return;
        }
        if (is_main_location) {
            await locationRepository.updateManyMainLocation(storeId);
        }
        const updateMainLocation = await locationRepository.updateIsmainLocation(id, is_main_location);
        res.status(201).json(updateMainLocation);
    }
    catch (error) {
        console.error('Error fetching location:', error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateIsMainLocation = updateIsMainLocation;
const updateLocationController = async (req, res) => {
    const { id } = req.params;
    const { name, address, postal_code, provinces, regencies, districts, villages, latitude, longitude, is_main_location, storeId, profileId, contact_name, contact_phone, type, guestId, } = req.body;
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
        const existingLocation = await locationRepository.findUniqueLoactionById(id);
        if (!existingLocation) {
            res.status(404).json({ message: 'Location not found' });
            return;
        }
        const updatedMainLocation = existingLocation.is_main_location
            ? true
            : is_main_location;
        const areaSearchResult = await (0, area_repository_1.searchAreasFromBiteship)(postal_code, 'single');
        if (!areaSearchResult || !areaSearchResult.areas?.length) {
            res
                .status(400)
                .json({ message: 'Area ID not found for given postal code' });
            return;
        }
        const area_id = areaSearchResult.areas[0].id;
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
            is_main_location: updatedMainLocation,
            storeId,
            profileId,
            contact_name,
            contact_phone,
            type,
            area_id,
            guestId,
        });
        res.status(200).json(location);
    }
    catch (error) {
        console.error('Error updating location:', error.response ? error.response.data : error.message);
        res
            .status(500)
            .json({ message: error.response?.data?.message || error.message });
    }
};
exports.updateLocationController = updateLocationController;
const deleteLocationController = async (req, res) => {
    const { id } = req.params;
    try {
        await axiosInstance.delete(`/${id}`);
        await locationRepository.deleteLocationRepository(id);
        res.status(200).json({ message: 'Location deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting location:', error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.deleteLocationController = deleteLocationController;
const createBuyerLocation = async (req, res) => {
    const { name, address, postal_code, city_district, latitude, provinces, regencies, districts, villages, longitude, is_main_location, storeId, profileId, type, contact_phone, contact_name, guestId, } = req.body;
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
        const areaSearchResult = await (0, area_repository_1.searchAreasFromBiteship)(postal_code.toString(), 'single');
        if (!areaSearchResult || !areaSearchResult.areas?.length) {
            res
                .status(400)
                .json({ message: 'Area ID not found for given postal code' });
            return;
        }
        const area_id = areaSearchResult.areas[0].id;
        const response = await axiosInstance.post('/', {
            name,
            address,
            postal_code,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            is_main_location: is_main_location,
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
    }
    catch (error) {
        console.error('Error creating location:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.createBuyerLocation = createBuyerLocation;
const getGuestLocation = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error fetching guest locations:', error);
        res.status(500).json({ error: 'Error fetching guest locations' });
        return;
    }
};
exports.getGuestLocation = getGuestLocation;
