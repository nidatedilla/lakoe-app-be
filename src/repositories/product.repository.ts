import prisma from "../utils/prisma";

export const getProductReposytory = async () => {
  return await prisma.products.findMany();
};

