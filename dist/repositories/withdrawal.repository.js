"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedeStatusToSuccessReqPaymentRepository = exports.updatedeStatusToProcessingReqPaymentRepository = exports.updateStatusToRejectedReqPaymentRepository = exports.searchProcessingReqPaymentsRepository = exports.findProcessingReqPaymentRepository = exports.searchRejectedReqPaymentsRepository = exports.findRejectedReqPaymentRepository = exports.searchSuccessReqPaymentsRepository = exports.findSuccessReqPaymentRepository = exports.searchPendingReqPaymentsRepository = exports.findPendingReqPaymentRepository = exports.createReqPaymentRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createReqPaymentRepository = async (payment) => {
    return await prisma_1.default.payment_requests.create({
        data: {
            status: 'Pending',
            storeId: payment.storeId,
            sellerId: payment.sellerId,
            amount: payment.amount,
            message: "Permintaan pencairan dana sedang dalam antrean dan akan segera diproses oleh admin."
        },
    });
};
exports.createReqPaymentRepository = createReqPaymentRepository;
const findPendingReqPaymentRepository = async () => {
    return await prisma_1.default.payment_requests.findMany({
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
exports.findPendingReqPaymentRepository = findPendingReqPaymentRepository;
const searchPendingReqPaymentsRepository = async (query) => {
    return await prisma_1.default.payment_requests.findMany({
        where: { status: 'Pending',
            OR: [
                {
                    seller: {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    store: {
                        name: {
                            contains: query,
                            mode: "insensitive"
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
    });
};
exports.searchPendingReqPaymentsRepository = searchPendingReqPaymentsRepository;
const findSuccessReqPaymentRepository = async () => {
    return await prisma_1.default.payment_requests.findMany({
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
exports.findSuccessReqPaymentRepository = findSuccessReqPaymentRepository;
const searchSuccessReqPaymentsRepository = async (query) => {
    return await prisma_1.default.payment_requests.findMany({
        where: { status: 'Success',
            OR: [
                {
                    seller: {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    store: {
                        name: {
                            contains: query,
                            mode: "insensitive"
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
    });
};
exports.searchSuccessReqPaymentsRepository = searchSuccessReqPaymentsRepository;
const findRejectedReqPaymentRepository = async () => {
    return await prisma_1.default.payment_requests.findMany({
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
exports.findRejectedReqPaymentRepository = findRejectedReqPaymentRepository;
const searchRejectedReqPaymentsRepository = async (query) => {
    return await prisma_1.default.payment_requests.findMany({
        where: { status: 'Rejected',
            OR: [
                {
                    seller: {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    store: {
                        name: {
                            contains: query,
                            mode: "insensitive"
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
    });
};
exports.searchRejectedReqPaymentsRepository = searchRejectedReqPaymentsRepository;
const findProcessingReqPaymentRepository = async () => {
    return await prisma_1.default.payment_requests.findMany({
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
exports.findProcessingReqPaymentRepository = findProcessingReqPaymentRepository;
const searchProcessingReqPaymentsRepository = async (query) => {
    return await prisma_1.default.payment_requests.findMany({
        where: { status: 'Processing',
            OR: [
                {
                    seller: {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    store: {
                        name: {
                            contains: query,
                            mode: "insensitive"
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
    });
};
exports.searchProcessingReqPaymentsRepository = searchProcessingReqPaymentsRepository;
const updateStatusToRejectedReqPaymentRepository = async (id) => {
    return await prisma_1.default.payment_requests.update({
        where: { id },
        data: {
            status: 'Rejected',
            message: "Permintaan pencairan dana ditolak oleh admin. Silakan hubungi support untuk informasi lebih lanjut."
        },
    });
};
exports.updateStatusToRejectedReqPaymentRepository = updateStatusToRejectedReqPaymentRepository;
const updatedeStatusToProcessingReqPaymentRepository = async (id) => {
    return await prisma_1.default.payment_requests.update({
        where: { id },
        data: {
            status: 'Processing',
            message: "Permintaan pencairan dana Anda sedang diproses. Mohon tunggu beberapa saat."
        },
    });
};
exports.updatedeStatusToProcessingReqPaymentRepository = updatedeStatusToProcessingReqPaymentRepository;
const updatedeStatusToSuccessReqPaymentRepository = async (id) => {
    return await prisma_1.default.payment_requests.update({
        where: {
            id,
        },
        data: {
            status: 'Success',
            message: "Permintaan pencairan dana telah disetujui dan dana telah ditransfer ke akun Bank Anda."
        },
    });
};
exports.updatedeStatusToSuccessReqPaymentRepository = updatedeStatusToSuccessReqPaymentRepository;
