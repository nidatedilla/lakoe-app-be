import prisma from '../utils/prisma';

export const generateUniqueDomain = async (
  storeName: string,
): Promise<string> => {
  let baseDomain = storeName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  let domain = baseDomain;
  let count = 1;

  while (await prisma.stores.findUnique({ where: { domain } })) {
    domain = `${baseDomain}-${count}`;
    count++;
  }

  return domain;
};
