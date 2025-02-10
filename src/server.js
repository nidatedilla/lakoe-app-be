// server.js
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors()); // agar API bisa diakses dari frontend
app.use(express.json());

/**
 * Fungsi untuk mengonversi data flat ke tree struktur
 * Misalnya: data flat memiliki { id, name, parentId }
 */
function buildCategoryTree(categories) {
  const map = new Map();
  const roots = [];

  // Inisialisasi map: setiap kategori ditambahkan dengan properti children
  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  // Bangun tree: jika ada parentId, masukkan ke children parent-nya
  categories.forEach((cat) => {
    if (cat.parentId) {
      const parent = map.get(cat.parentId);
      if (parent) {
        parent.children.push(map.get(cat.id));
      }
    } else {
      roots.push(map.get(cat.id));
    }
  });

  return roots;
}

app.get('/api/category', async (req, res) => {
  try {
    // Ambil semua data kategori
    const categories = await prisma.categories.findMany();
    // Konversi data flat ke struktur tree
    const categoryTree = buildCategoryTree(categories);
    res.json(categoryTree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data kategori' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
