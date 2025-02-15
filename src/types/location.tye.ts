export interface Locations {
  id: string;
  name?: string;
  address?: string;
  postal_code?: string;
  provinces?: string;
  regencies?: string;
  districts?: string;
  villages?: string;
  latitude?: string;
  longitude?: string;
  contact_name: string;
  contact_phone: string;
  type: string;
  store?: string;
  storeId?: string;
  profile?: string;
  profileId?: string;
  is_main_location: boolean;
  guestId: string;
}
