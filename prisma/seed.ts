import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data roles
 

  console.log('Seeder roles berhasil dijalankan!');

  // Seed data kategori
  console.log("Seeding categories...");

  const categories = await prisma.categories.createMany({
    data: [
      { id: "1", name: "Elektronik" },
      { id: "2", name: "Handphone", parentId: "1" },
      { id: "3", name: "Laptop", parentId: "1" },
      { id: "4", name: "Aksesoris", parentId: "1" },
      { id: "5", name: "Fashion" },
      { id: "6", name: "Pakaian Pria", parentId: "5" },
      { id: "7", name: "Pakaian Wanita", parentId: "5" },
      { id: "8", name: "Sepatu Pria", parentId: "5" },
      { id: "9", name: "Sepatu Wanita", parentId: "5" },
      { id: "10", name: "Makanan & Minuman" },
      { id: "11", name: "Makanan Ringan", parentId: "10" },
      { id: "12", name: "Minuman", parentId: "10" },
      { id: "13", name: "Komputer & Aksesoris" },
      { id: "14", name: "Komponen Komputer", parentId: "13" },
      { id: "15", name: "Monitor", parentId: "13" },
      { id: "16", name: "Keyboard & Mouse", parentId: "13" },
      { id: "17", name: "Kamera & Fotografi" },
      { id: "18", name: "Kamera DSLR", parentId: "17" },
      { id: "19", name: "Lensa Kamera", parentId: "17" },
      { id: "20", name: "Aksesoris Kamera", parentId: "17" },
      { id: "21", name: "Olahraga & Outdoor" },
      { id: "22", name: "Sepeda", parentId: "21" },
      { id: "23", name: "Peralatan Gym", parentId: "21" },
      { id: "24", name: "Camping & Hiking", parentId: "21" },
      { id: "25", name: "Peralatan Rumah Tangga" },
      { id: "26", name: "Peralatan Dapur", parentId: "25" },
      { id: "27", name: "Dekorasi Rumah", parentId: "25" },
      { id: "28", name: "Peralatan Kebersihan", parentId: "25" },
      // Kategori anak lebih dalam
      { id: "29", name: "Smartphone", parentId: "2" }, // Anak dari Handphone
      { id: "30", name: "Tablet", parentId: "2" }, // Anak dari Handphone
      { id: "31", name: "Gaming Laptop", parentId: "3" }, // Anak dari Laptop
      { id: "32", name: "Ultrabook", parentId: "3" }, // Anak dari Laptop
      { id: "33", name: "Headphone", parentId: "4" }, // Anak dari Aksesoris
      { id: "34", name: "Power Bank", parentId: "4" }, // Anak dari Aksesoris
      { id: "35", name: "Kaos Pria", parentId: "6" }, // Anak dari Pakaian Pria
      { id: "36", name: "Celana Pria", parentId: "6" }, // Anak dari Pakaian Pria
      { id: "37", name: "Dress", parentId: "7" }, // Anak dari Pakaian Wanita
      { id: "38", name: "Blouse", parentId: "7" }, // Anak dari Pakaian Wanita
      { id: "39", name: "Sepatu Lari", parentId: "8" }, // Anak dari Sepatu Pria
      { id: "40", name: "Sepatu Formal", parentId: "8" }, // Anak dari Sepatu Pria
      { id: "41", name: "Sepatu Sneakers", parentId: "9" }, // Anak dari Sepatu Wanita
      { id: "42", name: "Sepatu High Heels", parentId: "9" } // Anak dari Sepatu Wanita
    ],
    skipDuplicates: true, // Hindari duplikasi jika dijalankan lebih dari sekali
  });

  console.log("Categories seeded:", categories);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
