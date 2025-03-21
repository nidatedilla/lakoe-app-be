import { payment_requests } from '@prisma/client';
import prisma from '../utils/prisma';

export const createReqPaymentRepository = async (payment: payment_requests) => {
  return await prisma.payment_requests.create({
    data: {
      status: 'Pending',
      storeId: payment.storeId,
      sellerId: payment.sellerId,
      amount: payment.amount,
      message: "Permintaan pencairan dana sedang dalam antrean dan akan segera diproses oleh admin."
    },
  });
};

export const findPendingReqPaymentRepository = async () => {
  return await prisma.payment_requests.findMany({
    where: { status: 'Pending' },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  });
};

export const searchPendingReqPaymentsRepository = async (query:string) => {
  return await prisma.payment_requests.findMany({
    where: {status : 'Pending', 
      OR: [
        {
          seller: {
            name : {
              contains : query,
              mode : "insensitive"
            }
          },
          store : {
            name : {
              contains :query,
              mode : "insensitive"
            }
          }
        }
      ]
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  })
}
export const findSuccessReqPaymentRepository = async () => {
  return await prisma.payment_requests.findMany({
    where: { status: 'Success' },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  });
};

export const searchSuccessReqPaymentsRepository = async (query:string) => {
  return await prisma.payment_requests.findMany({
    where: {status : 'Success', 
      OR: [
        {
          seller: {
            name : {
              contains : query,
              mode : "insensitive"
            }
          },
          store : {
            name : {
              contains :query,
              mode : "insensitive"
            }
          }
        }
      ]
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  })
}

export const findRejectedReqPaymentRepository = async () => {
  return await prisma.payment_requests.findMany({
    where: { status: 'Rejected' },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  });
};

export const searchRejectedReqPaymentsRepository = async (query:string) => {
  return await prisma.payment_requests.findMany({
    where: {status : 'Rejected', 
      OR: [
        {
          seller: {
            name : {
              contains : query,
              mode : "insensitive"
            }
          },
          store : {
            name : {
              contains :query,
              mode : "insensitive"
            }
          }
        }
      ]
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  })
}

export const findProcessingReqPaymentRepository = async () => {
  return await prisma.payment_requests.findMany({
    where: { status: 'Processing' },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  });
};


export const searchProcessingReqPaymentsRepository = async (query:string) => {
  return await prisma.payment_requests.findMany({
    where: {status : 'Processing', 
      OR: [
        {
          seller: {
            name : {
              contains : query,
              mode : "insensitive"
            }
          },
          store : {
            name : {
              contains :query,
              mode : "insensitive"
            }
          }
        }
      ]
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      seller: true,
      store: {
        select: {
          id: true,
          name: true,
          banner: true,
          logo: true,
          description: true,
          domain: true,
          slogan: true,
          userId: true,
          bank_accounts: true,
        },
      },
    },
  })
}

export const updateStatusToRejectedReqPaymentRepository = async (
  id: string,
) => {
  return await prisma.payment_requests.update({
    where: { id },
    data: {
      status: 'Rejected',
      message: "Permintaan pencairan dana ditolak oleh admin. Silakan hubungi support untuk informasi lebih lanjut."
    },
  });
};
export const updatedeStatusToProcessingReqPaymentRepository = async (
  id: string,
) => {
  return await prisma.payment_requests.update({
    where: { id },
    data: {
      status: 'Processing',
      message: "Permintaan pencairan dana Anda sedang diproses. Mohon tunggu beberapa saat."
    },
  });
};

export const updatedeStatusToSuccessReqPaymentRepository = async (
  id: string,
) => {
  return await prisma.payment_requests.update({
    where: {
      id,
    },
    data: {
      status: 'Success',
      message: "Permintaan pencairan dana telah disetujui dan dana telah ditransfer ke akun Bank Anda."
    },
  });
};
