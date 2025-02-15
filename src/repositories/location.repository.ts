import { locations } from '@prisma/client';
import prisma from '../utils/prisma';
import { Locations } from '../types/location.type';

export const createLocationRepository = async (location: locations) => {
  return await prisma.locations.create({
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

export const createBuyerLocationRepository = async (location: Locations) => {
  return await prisma.locations.upsert({
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

export const deleteLocationRepository = async (id: string) => {
  return await prisma.locations.delete({
    where: { id },
  });
};

export const getAllLocationRepository = async () => {
  return await prisma.locations.findMany();
};

export const getUniqueLocationRepository = async (id: string) => {
  return await prisma.locations.findUnique({
    where: { id },
  });
};

export const updateLocationRepository = async (location: locations) => {
  return await prisma.locations.update({
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

export const findUniqueLoactionById = async (id: string) => {
  return await prisma.locations.findUnique({
    where: { id: id },
  });
};

export const findAllLocationByUserRepository = async (storeId: string) => {
  return await prisma.locations.findMany({
    where: { id: storeId },
  });
};

export const findGuestLocation = async (guestId: string) => {
  return await prisma.locations.findUnique({
    where: { guestId },
  });
};
