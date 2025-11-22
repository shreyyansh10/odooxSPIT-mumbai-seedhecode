module.exports = [
"[project]/database/database-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Database service using Prisma for StockMaster Inventory Management System
__turbopack_context__.s([
    "databaseService",
    ()=>databaseService,
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/prisma/index.js [app-route] (ecmascript)");
;
// Create a singleton Prisma client
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
    log: [
        'query',
        'error',
        'warn'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
const databaseService = {
    // Initialize database with default data
    initializeDatabase: async ()=>{
        try {
            // Check if data already exists
            const existingProducts = await prisma.product.count();
            if (existingProducts > 0) {
                console.log('Database already initialized');
                return;
            }
            console.log('Initializing database with default data...');
            // Create default warehouses
            const mainWarehouse = await prisma.warehouse.create({
                data: {
                    name: 'Main Warehouse'
                }
            });
            const productionWarehouse = await prisma.warehouse.create({
                data: {
                    name: 'Production Floor'
                }
            });
            // Create default locations
            const locations = await Promise.all([
                prisma.location.create({
                    data: {
                        id: 'loc1',
                        name: 'Rack A',
                        type: 'STORAGE',
                        capacity: 1000,
                        currentUsage: 450,
                        warehouseId: mainWarehouse.id
                    }
                }),
                prisma.location.create({
                    data: {
                        id: 'loc2',
                        name: 'Rack B',
                        type: 'STORAGE',
                        capacity: 500,
                        currentUsage: 120,
                        warehouseId: mainWarehouse.id
                    }
                }),
                prisma.location.create({
                    data: {
                        id: 'loc3',
                        name: 'Picking Zone',
                        type: 'STAGING',
                        capacity: 200,
                        currentUsage: 50,
                        warehouseId: mainWarehouse.id
                    }
                }),
                prisma.location.create({
                    data: {
                        id: 'loc4',
                        name: 'Production Rack',
                        type: 'PRODUCTION',
                        capacity: 300,
                        currentUsage: 200,
                        warehouseId: productionWarehouse.id
                    }
                }),
                prisma.location.create({
                    data: {
                        id: 'main-warehouse',
                        name: 'Main Warehouse',
                        type: 'STORAGE',
                        capacity: 10000,
                        currentUsage: 0,
                        warehouseId: mainWarehouse.id
                    }
                })
            ]);
            // Create default products with location stock
            const products = [
                {
                    id: '1',
                    name: 'Steel Rods',
                    sku: 'SR-001',
                    category: 'Raw Materials',
                    uom: 'kg',
                    stock: 450,
                    reorderLevel: 100,
                    locationStocks: [
                        {
                            locationId: 'loc1',
                            quantity: 300
                        },
                        {
                            locationId: 'loc2',
                            quantity: 100
                        },
                        {
                            locationId: 'loc3',
                            quantity: 50
                        }
                    ]
                },
                {
                    id: '2',
                    name: 'Aluminum Sheets',
                    sku: 'AS-002',
                    category: 'Raw Materials',
                    uom: 'sheet',
                    stock: 120,
                    reorderLevel: 50,
                    locationStocks: [
                        {
                            locationId: 'loc1',
                            quantity: 80
                        },
                        {
                            locationId: 'loc2',
                            quantity: 40
                        }
                    ]
                },
                {
                    id: '3',
                    name: 'Plastic Frames',
                    sku: 'PF-003',
                    category: 'Components',
                    uom: 'piece',
                    stock: 8,
                    reorderLevel: 20,
                    locationStocks: [
                        {
                            locationId: 'loc3',
                            quantity: 8
                        }
                    ]
                },
                {
                    id: '4',
                    name: 'Rubber Seals',
                    sku: 'RS-004',
                    category: 'Components',
                    uom: 'piece',
                    stock: 0,
                    reorderLevel: 25,
                    locationStocks: []
                },
                {
                    id: '5',
                    name: 'Copper Wire',
                    sku: 'CW-005',
                    category: 'Raw Materials',
                    uom: 'kg',
                    stock: 320,
                    reorderLevel: 75,
                    locationStocks: [
                        {
                            locationId: 'loc1',
                            quantity: 200
                        },
                        {
                            locationId: 'loc4',
                            quantity: 120
                        }
                    ]
                }
            ];
            for (const productData of products){
                const product = await prisma.product.create({
                    data: {
                        id: productData.id,
                        name: productData.name,
                        sku: productData.sku,
                        category: productData.category,
                        uom: productData.uom,
                        stock: productData.stock,
                        reorderLevel: productData.reorderLevel
                    }
                });
                // Create location stocks
                for (const locationStock of productData.locationStocks){
                    await prisma.locationStock.create({
                        data: {
                            productId: product.id,
                            locationId: locationStock.locationId,
                            quantity: locationStock.quantity
                        }
                    });
                }
            }
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    },
    // Product operations
    getProducts: async ()=>{
        return await prisma.product.findMany({
            include: {
                locationStocks: {
                    include: {
                        location: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });
    },
    createProduct: async (data)=>{
        return await prisma.$transaction(async (tx)=>{
            const product = await tx.product.create({
                data: {
                    name: data.name,
                    sku: data.sku,
                    category: data.category,
                    uom: data.uom,
                    stock: data.stock,
                    reorderLevel: data.reorderLevel,
                    lastRestockDate: data.lastRestockDate
                }
            });
            // Initialize stock in main warehouse
            if (data.stock > 0) {
                await tx.locationStock.create({
                    data: {
                        productId: product.id,
                        locationId: 'main-warehouse',
                        quantity: data.stock
                    }
                });
            }
            return product;
        });
    },
    updateProduct: async (id, data)=>{
        return await prisma.product.update({
            where: {
                id
            },
            data
        });
    },
    deleteProduct: async (id)=>{
        return await prisma.product.delete({
            where: {
                id
            }
        });
    },
    // Location stock operations
    updateLocationStock: async (productId, locationId, quantity, operation)=>{
        return await prisma.$transaction(async (tx)=>{
            // Find or create location stock
            let locationStock = await tx.locationStock.findUnique({
                where: {
                    productId_locationId: {
                        productId,
                        locationId
                    }
                }
            });
            if (!locationStock) {
                locationStock = await tx.locationStock.create({
                    data: {
                        productId,
                        locationId,
                        quantity: 0
                    }
                });
            }
            let newQuantity = locationStock.quantity;
            switch(operation){
                case 'add':
                    newQuantity = locationStock.quantity + quantity;
                    break;
                case 'subtract':
                    newQuantity = Math.max(0, locationStock.quantity - quantity);
                    break;
                case 'set':
                    newQuantity = quantity;
                    break;
            }
            // Update location stock
            await tx.locationStock.update({
                where: {
                    id: locationStock.id
                },
                data: {
                    quantity: newQuantity
                }
            });
            // Recalculate total product stock
            const allLocationStocks = await tx.locationStock.findMany({
                where: {
                    productId
                }
            });
            const totalStock = allLocationStocks.reduce((sum, ls)=>sum + ls.quantity, 0);
            await tx.product.update({
                where: {
                    id: productId
                },
                data: {
                    stock: totalStock
                }
            });
            return {
                success: true,
                newQuantity,
                totalStock
            };
        });
    },
    getLocationStock: async (productId, locationId)=>{
        const locationStock = await prisma.locationStock.findUnique({
            where: {
                productId_locationId: {
                    productId,
                    locationId
                }
            }
        });
        return locationStock?.quantity || 0;
    },
    // Receipt operations
    createReceipt: async (data)=>{
        return await prisma.$transaction(async (tx)=>{
            const receipt = await tx.receipt.create({
                data: {
                    date: data.date,
                    supplier: data.supplier,
                    locationId: data.locationId,
                    totalItems: data.items.length,
                    notes: data.notes,
                    status: 'DONE'
                }
            });
            // Create receipt items and update stock
            for (const item of data.items){
                await tx.receiptItem.create({
                    data: {
                        receiptId: receipt.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        receivedQuantity: item.receivedQuantity || item.quantity
                    }
                });
                // Update location stock
                await databaseService.updateLocationStock(item.productId, data.locationId, item.receivedQuantity || item.quantity, 'add');
                // Create ledger entry
                await tx.ledgerEntry.create({
                    data: {
                        date: data.date,
                        type: 'RECEIPT',
                        referenceId: receipt.id,
                        productId: item.productId,
                        quantity: item.receivedQuantity || item.quantity,
                        toLocationId: data.locationId,
                        notes: `Received from ${data.supplier}`
                    }
                });
            }
            return receipt.id;
        });
    },
    // Delivery operations
    createDelivery: async (data)=>{
        return await prisma.$transaction(async (tx)=>{
            const delivery = await tx.delivery.create({
                data: {
                    date: data.date,
                    customer: data.customer,
                    totalItems: data.items.length,
                    notes: data.notes,
                    status: 'DONE'
                }
            });
            // Create delivery items and update stock
            for (const item of data.items){
                await tx.deliveryItem.create({
                    data: {
                        deliveryId: delivery.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        deliveredQuantity: item.deliveredQuantity || item.quantity
                    }
                });
                // Update location stock (subtract from main warehouse)
                await databaseService.updateLocationStock(item.productId, 'main-warehouse', item.deliveredQuantity || item.quantity, 'subtract');
                // Create ledger entry
                await tx.ledgerEntry.create({
                    data: {
                        date: data.date,
                        type: 'DELIVERY',
                        referenceId: delivery.id,
                        productId: item.productId,
                        quantity: -(item.deliveredQuantity || item.quantity),
                        fromLocationId: 'main-warehouse',
                        notes: `Delivered to ${data.customer}`
                    }
                });
            }
            return delivery.id;
        });
    },
    // Get operations data
    getReceipts: async ()=>{
        return await prisma.receipt.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                location: true
            },
            orderBy: {
                date: 'desc'
            }
        });
    },
    getDeliveries: async ()=>{
        return await prisma.delivery.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                date: 'desc'
            }
        });
    },
    getTransfers: async ()=>{
        return await prisma.transfer.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                fromLocation: true,
                toLocation: true
            },
            orderBy: {
                date: 'desc'
            }
        });
    },
    getAdjustments: async ()=>{
        return await prisma.adjustment.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                location: true
            },
            orderBy: {
                date: 'desc'
            }
        });
    },
    getLedgerEntries: async ()=>{
        return await prisma.ledgerEntry.findMany({
            include: {
                product: true,
                fromLocation: true,
                toLocation: true
            },
            orderBy: {
                date: 'desc'
            }
        });
    },
    getLocations: async ()=>{
        return await prisma.location.findMany({
            include: {
                warehouse: true
            },
            orderBy: {
                name: 'asc'
            }
        });
    },
    getWarehouses: async ()=>{
        return await prisma.warehouse.findMany({
            include: {
                locations: true
            },
            orderBy: {
                name: 'asc'
            }
        });
    },
    getLowStockProducts: async ()=>{
        return await prisma.product.findMany({
            where: {
                AND: [
                    {
                        reorderLevel: {
                            not: null
                        }
                    },
                    {
                        stock: {
                            lte: prisma.product.fields.reorderLevel
                        }
                    }
                ]
            },
            include: {
                locationStocks: {
                    include: {
                        location: true
                    }
                }
            }
        });
    },
    getOperationStats: async ()=>{
        const [totalProducts, lowStockItems, outOfStockItems, pendingReceipts, pendingDeliveries, scheduledTransfers] = await Promise.all([
            prisma.product.count(),
            prisma.product.count({
                where: {
                    stock: {
                        lt: 20
                    }
                }
            }),
            prisma.product.count({
                where: {
                    stock: 0
                }
            }),
            prisma.receipt.count({
                where: {
                    status: {
                        in: [
                            'WAITING',
                            'DRAFT'
                        ]
                    }
                }
            }),
            prisma.delivery.count({
                where: {
                    status: {
                        in: [
                            'WAITING',
                            'DRAFT'
                        ]
                    }
                }
            }),
            prisma.transfer.count({
                where: {
                    status: {
                        in: [
                            'WAITING',
                            'DRAFT'
                        ]
                    }
                }
            })
        ]);
        return {
            totalProducts,
            lowStockItems,
            outOfStockItems,
            pendingReceipts,
            pendingDeliveries,
            scheduledTransfers
        };
    }
};
}),
"[project]/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API routes for product management
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$database$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/database/database-service.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$database$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["databaseService"].getProducts();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch products',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$database$2f$database$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["databaseService"].createProduct({
            name: body.name,
            sku: body.sku,
            category: body.category,
            uom: body.uom,
            stock: body.stock || 0,
            reorderLevel: body.reorderLevel,
            lastRestockDate: body.lastRestockDate ? new Date(body.lastRestockDate) : undefined
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to create product',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=_affdc1fe._.js.map