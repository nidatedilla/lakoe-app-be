// src/seed.ts
import { PrismaClient } from '@prisma/client';
import seedCouriers from './seeders/courier-seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeder roles berhasil dijalankan!');

  console.log("Seeding categories...");

  // Seed data kategori dengan struktur tiga level untuk tampilan multikolom
  const categories = await prisma.categories.createMany({
    data: [
      // Main Categories
      { id: "1", name: "Elektronik" },
      { id: "5", name: "Fashion" },
      { id: "10", name: "Makanan & Minuman" },
      { id: "13", name: "Komputer & Aksesoris" },
      { id: "17", name: "Kamera & Fotografi" },
      { id: "21", name: "Olahraga & Outdoor" },
      { id: "25", name: "Peralatan Rumah Tangga" },

      // Sub Categories untuk Elektronik
      { id: "2", name: "Handphone", parentId: "1" },
      { id: "3", name: "Laptop", parentId: "1" },
      { id: "4", name: "Aksesoris", parentId: "1" },

      // Item (Level 3) untuk Handphone
      { id: "29", name: "Smartphone", parentId: "2" },
      { id: "30", name: "Tablet", parentId: "2" },

      // Item (Level 3) untuk Laptop
      { id: "31", name: "Gaming Laptop", parentId: "3" },
      { id: "32", name: "Ultrabook", parentId: "3" },

      // Item (Level 3) untuk Aksesoris Elektronik
      { id: "33", name: "Headphone", parentId: "4" },
      { id: "34", name: "Power Bank", parentId: "4" },

      // Sub Categories untuk Fashion
      { id: "6", name: "Pakaian Pria", parentId: "5" },
      { id: "7", name: "Pakaian Wanita", parentId: "5" },
      { id: "8", name: "Sepatu Pria", parentId: "5" },
      { id: "9", name: "Sepatu Wanita", parentId: "5" },

      // Item (Level 3) untuk Pakaian Pria
      { id: "35", name: "Kaos Pria", parentId: "6" },
      { id: "36", name: "Celana Pria", parentId: "6" },

      // Item (Level 3) untuk Pakaian Wanita
      { id: "37", name: "Dress", parentId: "7" },
      { id: "38", name: "Blouse", parentId: "7" },

      // Item (Level 3) untuk Sepatu Pria
      { id: "39", name: "Sepatu Lari", parentId: "8" },
      { id: "40", name: "Sepatu Formal", parentId: "8" },

      // Item (Level 3) untuk Sepatu Wanita
      { id: "41", name: "Sepatu Sneakers", parentId: "9" },
      { id: "42", name: "Sepatu High Heels", parentId: "9" },

      // Sub Categories untuk Makanan & Minuman
      { id: "11", name: "Makanan Ringan", parentId: "10" },
      { id: "12", name: "Minuman", parentId: "10" },

      // Sub Categories untuk Komputer & Aksesoris
      { id: "14", name: "Komponen Komputer", parentId: "13" },
      { id: "15", name: "Monitor", parentId: "13" },
      { id: "16", name: "Keyboard & Mouse", parentId: "13" },

      // Sub Categories untuk Kamera & Fotografi
      { id: "18", name: "Kamera DSLR", parentId: "17" },
      { id: "19", name: "Lensa Kamera", parentId: "17" },
      { id: "20", name: "Aksesoris Kamera", parentId: "17" },

      // Sub Categories untuk Olahraga & Outdoor
      { id: "22", name: "Sepeda", parentId: "21" },
      { id: "23", name: "Peralatan Gym", parentId: "21" },
      { id: "24", name: "Camping & Hiking", parentId: "21" },

      // Sub Categories untuk Peralatan Rumah Tangga
      { id: "26", name: "Peralatan Dapur", parentId: "25" },
      { id: "27", name: "Dekorasi Rumah", parentId: "25" },
      { id: "28", name: "Peralatan Kebersihan", parentId: "25" },
    ],
    skipDuplicates: true,
  });

  console.log("Categories seeded:", categories);

  await seedCouriers(prisma);

  console.log('Semua seeder berhasil dijalankan!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
