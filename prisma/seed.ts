// src/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeder roles berhasil dijalankan!');
  console.log('Seeding admin...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  console.log('Seeder roles berhasil dijalankan!');

  console.log('Seeding categories...');

  const admin = await prisma.users.upsert({
    where: { email: 'admin@lakoe.com' },
    update: {},
    create: {
      email: 'admin@lakoe.com',
      password: hashedPassword,
      name: 'Admin Lakoe',
      phone: '08123456789',
      role: 'ADMIN',
    },
  });

  console.log('Admin seeded:', admin);

  // Seed data kategori dengan struktur tiga level untuk tampilan multikolom
  const categories = await prisma.categories.createMany({
    data: [
      // Main Categories
      { id: '1', name: 'Elektronik' },
      { id: '5', name: 'Fashion' },
      { id: '10', name: 'Makanan & Minuman' },
      { id: '13', name: 'Komputer & Aksesoris' },
      { id: '17', name: 'Kamera & Fotografi' },
      { id: '21', name: 'Olahraga & Outdoor' },
      { id: '25', name: 'Peralatan Rumah Tangga' },

      // Sub Categories untuk Elektronik
      { id: '2', name: 'Handphone', parentId: '1' },
      { id: '3', name: 'Laptop', parentId: '1' },
      { id: '4', name: 'Aksesoris', parentId: '1' },

      // Item (Level 3) untuk Handphone
      { id: '29', name: 'Smartphone', parentId: '2' },
      { id: '30', name: 'Tablet', parentId: '2' },

      // Item (Level 3) untuk Laptop
      { id: '31', name: 'Gaming Laptop', parentId: '3' },
      { id: '32', name: 'Ultrabook', parentId: '3' },

      // Item (Level 3) untuk Aksesoris Elektronik
      { id: '33', name: 'Headphone', parentId: '4' },
      { id: '34', name: 'Power Bank', parentId: '4' },

      // Sub Categories untuk Fashion
      { id: '6', name: 'Pakaian Pria', parentId: '5' },
      { id: '7', name: 'Pakaian Wanita', parentId: '5' },
      { id: '8', name: 'Sepatu Pria', parentId: '5' },
      { id: '9', name: 'Sepatu Wanita', parentId: '5' },

      // Item (Level 3) untuk Pakaian Pria
      { id: '35', name: 'Kaos Pria', parentId: '6' },
      { id: '36', name: 'Celana Pria', parentId: '6' },

      // Item (Level 3) untuk Pakaian Wanita
      { id: '37', name: 'Dress', parentId: '7' },
      { id: '38', name: 'Blouse', parentId: '7' },

      // Item (Level 3) untuk Sepatu Pria
      { id: '39', name: 'Sepatu Lari', parentId: '8' },
      { id: '40', name: 'Sepatu Formal', parentId: '8' },

      // Item (Level 3) untuk Sepatu Wanita
      { id: '41', name: 'Sepatu Sneakers', parentId: '9' },
      { id: '42', name: 'Sepatu High Heels', parentId: '9' },

      // Sub Categories untuk Makanan & Minuman
      { id: '11', name: 'Makanan Ringan', parentId: '10' },
      { id: '12', name: 'Minuman', parentId: '10' },

      // Sub Categories untuk Komputer & Aksesoris
      { id: '14', name: 'Komponen Komputer', parentId: '13' },
      { id: '15', name: 'Monitor', parentId: '13' },
      { id: '16', name: 'Keyboard & Mouse', parentId: '13' },

      // Sub Categories untuk Kamera & Fotografi
      { id: '18', name: 'Kamera DSLR', parentId: '17' },
      { id: '19', name: 'Lensa Kamera', parentId: '17' },
      { id: '20', name: 'Aksesoris Kamera', parentId: '17' },

      // Sub Categories untuk Olahraga & Outdoor
      { id: '22', name: 'Sepeda', parentId: '21' },
      { id: '23', name: 'Peralatan Gym', parentId: '21' },
      { id: '24', name: 'Camping & Hiking', parentId: '21' },

      // Sub Categories untuk Peralatan Rumah Tangga
      { id: '26', name: 'Peralatan Dapur', parentId: '25' },
      { id: '27', name: 'Dekorasi Rumah', parentId: '25' },
      { id: '28', name: 'Peralatan Kebersihan', parentId: '25' },
    ],
    skipDuplicates: true,
  });

  console.log('Categories seeded:', categories);
}

export default async function seedCouriers(prisma: PrismaClient) {
  console.log('Seeding couriers...');
  const couriers = [
    {
      courier_code: 'gojek',
      courier_service_name: 'Same Day',
      courier_service_code: 'same_day',
      description: 'On Demand within 8 hours (bike)',
      tier: 'premium',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'Gojek',
      service_type: 'same_day',
      shipping_type: 'parcel',
      shipment_duration_range: '6 - 8',
      shipment_duration_unit: 'hours',
    },
    {
      courier_code: 'grab',
      courier_service_name: 'Same Day',
      courier_service_code: 'same_day',
      description: 'On Demand within 8 hours (bike)',
      tier: 'premium',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'Grab',
      service_type: 'Same Day',
      shipping_type: 'parcel',
      shipment_duration_range: '6 - 8',
      shipment_duration_unit: 'hours',
    },
    {
      courier_code: 'jne',
      courier_service_name: 'Reguler',
      courier_service_code: 'reg',
      description: 'Regular service',
      tier: 'free',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'JNE',
      service_type: 'standard',
      shipping_type: 'parcel',
      shipment_duration_range: '2 - 3',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'jne',
      courier_service_name: 'YES',
      courier_service_code: 'yes',
      description: 'Express, next day',
      tier: 'essentials',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'JNE',
      service_type: 'overnight',
      shipping_type: 'parcel',
      shipment_duration_range: '1',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'jne',
      courier_service_name: 'OKE',
      courier_service_code: 'oke',
      description: 'Economy service',
      tier: 'free',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'JNE',
      service_type: 'standard',
      shipping_type: 'parcel',
      shipment_duration_range: '3 - 4',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'jne',
      courier_service_name: 'JTR',
      courier_service_code: 'jtr',
      description: 'Trucking with minimum weight of 10 kg',
      tier: 'premium',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'JNE',
      service_type: 'standard',
      shipping_type: 'freight',
      shipment_duration_range: '3 - 4',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'sicepat',
      courier_service_name: 'Reguler',
      courier_service_code: 'reg',
      description: 'Layanan reguler',
      tier: 'free',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'SiCepat',
      service_type: 'standard',
      shipping_type: 'parcel',
      shipment_duration_range: '2 - 3',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'sicepat',
      courier_service_name: 'Best',
      courier_service_code: 'best',
      description: 'Besok sampai tujuan',
      tier: 'essentials',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'SiCepat',
      service_type: 'overnight',
      shipping_type: 'parcel',
      shipment_duration_range: '1',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'sicepat',
      courier_service_name: 'SDS',
      courier_service_code: 'sds',
      description: 'Same day service',
      tier: 'standard',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'SiCepat',
      service_type: 'same_day',
      shipping_type: 'parcel',
      shipment_duration_range: '1',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'sicepat',
      courier_service_name: 'GOKIL',
      courier_service_code: 'gokil',
      description: 'Layanan kargo',
      tier: 'premium',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'SiCepat',
      service_type: 'standard',
      shipping_type: 'freight',
      shipment_duration_range: '3 - 4',
      shipment_duration_unit: 'days',
    },
    {
      courier_code: 'jnt',
      courier_service_name: 'EZ',
      courier_service_code: 'ez',
      description: 'Layanan reguler',
      tier: 'free',
      available_collection_method: ['pickup'],
      available_for_cash_on_delivery: false,
      available_for_proof_of_delivery: false,
      available_for_instant_waybill_id: true,
      courier_name: 'J&T',
      service_type: 'standard',
      shipping_type: 'parcel',
      shipment_duration_range: '2 - 3',
      shipment_duration_unit: 'days',
    },
  ];

  for (const courier of couriers) {
    await prisma.couriers.upsert({
      where: {
        courier_code_courier_service_code: {
          courier_code: courier.courier_code,
          courier_service_code: courier.courier_service_code,
        },
      },
      update: {},
      create: courier,
    });
  }

  console.log('Seed data for couriers added successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
