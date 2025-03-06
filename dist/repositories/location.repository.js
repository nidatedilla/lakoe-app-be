"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIsmainLocation = exports.updateManyMainLocation = exports.findGuestLocation = exports.findAllLocationByUserRepository = exports.findUniqueLoactionById = exports.updateLocationRepository = exports.getUniqueLocationRepository = exports.getAllLocationRepository = exports.deleteLocationRepository = exports.createBuyerLocationRepository = exports.createLocationRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createLocationRepository = async (location) => {
    return await prisma_1.default.locations.create({
        data: {
            id: location.id,
            name: location.name,
            address: location.address,
            postal_code: location.postal_code,
            storeId: location.storeId,
            is_main_location: location.is_main_location,
            profileId: location.profileId,
            longitude: location.longitude,
            latitude: location.latitude,
            contact_name: location.contact_name,
            contact_phone: location.contact_phone,
            provinces: location.provinces,
            regencies: location.regencies,
            districts: location.districts,
            villages: location.villages,
            type: location.type,
            guestId: location.guestId,
            area_id: location.area_id,
        },
    });
};
exports.createLocationRepository = createLocationRepository;
const createBuyerLocationRepository = async (location) => {
    return await prisma_1.default.locations.upsert({
        where: { guestId: location.guestId },
        update: {
            name: location.name,
            address: location.address,
            postal_code: location.postal_code,
            storeId: location.storeId,
            is_main_location: location.is_main_location,
            profileId: location.profileId,
            longitude: location.longitude,
            latitude: location.latitude,
            contact_name: location.contact_name,
            contact_phone: location.contact_phone,
            provinces: location.provinces,
            regencies: location.regencies,
            districts: location.districts,
            villages: location.villages,
            type: location.type,
            guestId: location.guestId,
            area_id: location.area_id,
        },
        create: {
            name: location.name,
            address: location.address,
            postal_code: location.postal_code,
            storeId: location.storeId,
            is_main_location: location.is_main_location,
            profileId: location.profileId,
            longitude: location.longitude,
            latitude: location.latitude,
            contact_name: location.contact_name,
            contact_phone: location.contact_phone,
            provinces: location.provinces,
            regencies: location.regencies,
            districts: location.districts,
            villages: location.villages,
            type: location.type,
            guestId: location.guestId,
            area_id: location.area_id,
        },
    });
};
exports.createBuyerLocationRepository = createBuyerLocationRepository;
const deleteLocationRepository = async (id) => {
    return await prisma_1.default.locations.delete({
        where: { id },
    });
};
exports.deleteLocationRepository = deleteLocationRepository;
const getAllLocationRepository = async () => {
    return await prisma_1.default.locations.findMany({});
};
exports.getAllLocationRepository = getAllLocationRepository;
const getUniqueLocationRepository = async (id) => {
    return await prisma_1.default.locations.findUnique({
        where: { id },
    });
};
exports.getUniqueLocationRepository = getUniqueLocationRepository;
const updateLocationRepository = async (location) => {
    return await prisma_1.default.locations.update({
        where: { id: location.id },
        data: {
            name: location.name,
            address: location.address,
            postal_code: location.postal_code,
            provinces: location.provinces,
            regencies: location.regencies,
            districts: location.districts,
            villages: location.villages,
            storeId: location.storeId,
            is_main_location: location.is_main_location,
            profileId: location.profileId,
            longitude: location.longitude,
            latitude: location.latitude,
            area_id: location.area_id,
        },
    });
};
exports.updateLocationRepository = updateLocationRepository;
const findUniqueLoactionById = async (id) => {
    return await prisma_1.default.locations.findUnique({
        where: { id: id },
    });
};
exports.findUniqueLoactionById = findUniqueLoactionById;
const findAllLocationByUserRepository = async (storeId) => {
    return await prisma_1.default.locations.findMany({
        where: { id: storeId },
        orderBy: {
            is_main_location: "desc"
        }
    });
};
exports.findAllLocationByUserRepository = findAllLocationByUserRepository;
const findGuestLocation = async (guestId) => {
    return await prisma_1.default.locations.findUnique({
        where: { guestId },
    });
};
exports.findGuestLocation = findGuestLocation;
const updateManyMainLocation = async (storeId) => {
    return await prisma_1.default.locations.updateMany({
        where: { storeId },
        data: {
            is_main_location: false
        }
    });
};
exports.updateManyMainLocation = updateManyMainLocation;
const updateIsmainLocation = async (id, is_main_location) => {
    return await prisma_1.default.locations.update({
        where: { id },
        data: {
            is_main_location: is_main_location
        }
    });
};
exports.updateIsmainLocation = updateIsmainLocation;
