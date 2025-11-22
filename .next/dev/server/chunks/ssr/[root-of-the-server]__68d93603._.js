module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: true,
        storageKey: "theme",
        disableTransitionOnChange: true,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/auth-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Authentication store with OTP support
__turbopack_context__.s([
    "authStore",
    ()=>authStore
]);
const AUTH_STORAGE_KEY = "auth_store";
const OTP_EXPIRY = 5 * 60 * 1000 // 5 minutes
;
const authStore = {
    initializeAuth: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const existing = undefined;
    },
    getAuthData: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return {
            users: {},
            currentUser: null
        };
        //TURBOPACK unreachable
        ;
    },
    saveAuthData: (data)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    signup: (email, password, name)=>{
        const data = authStore.getAuthData();
        if (data.users[email]) {
            throw new Error("Email already registered");
        }
        data.users[email] = {
            password,
            name,
            role: "staff"
        };
        authStore.saveAuthData(data);
        return {
            id: email,
            email,
            name,
            role: "staff"
        };
    },
    login: (email, password)=>{
        const data = authStore.getAuthData();
        const user = data.users[email];
        if (!user || user.password !== password) {
            throw new Error("Invalid email or password");
        }
        const authUser = {
            id: email,
            email,
            name: user.name,
            role: user.role
        };
        data.currentUser = authUser;
        authStore.saveAuthData(data);
        return authUser;
    },
    logout: ()=>{
        const data = authStore.getAuthData();
        data.currentUser = null;
        authStore.saveAuthData(data);
    },
    getCurrentUser: ()=>{
        const data = authStore.getAuthData();
        return data.currentUser;
    },
    requestOTP: async (email)=>{
        try {
            const response = await fetch('/api/auth/request-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to send OTP');
            }
            return true;
        } catch (error) {
            console.error('OTP request failed:', error);
            throw error;
        }
    },
    verifyOTP: async (email, otp)=>{
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to verify OTP');
            }
            return true;
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw error;
        }
    },
    resetPassword: async (email, newPassword)=>{
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    newPassword
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }
            return true;
        } catch (error) {
            console.error('Password reset failed:', error);
            throw error;
        }
    }
};
}),
"[project]/contexts/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].initializeAuth();
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].getCurrentUser();
        setUser(currentUser);
    }, []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password)=>{
        setIsLoading(true);
        setError(null);
        try {
            const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].login(email, password);
            setUser(authUser);
            return authUser;
        } catch (err) {
            setError(err.message || "Login failed");
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const signup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password, name)=>{
        setIsLoading(true);
        setError(null);
        try {
            const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].signup(email, password, name);
            setUser(authUser);
            return authUser;
        } catch (err) {
            setError(err.message || "Signup failed");
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].logout();
        setUser(null);
    }, []);
    const requestOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email)=>{
        setIsLoading(true);
        setError(null);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].requestOTP(email);
        } catch (err) {
            setError(err.message || "OTP request failed");
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const verifyOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, otp)=>{
        setIsLoading(true);
        setError(null);
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].verifyOTP(email, otp);
        } catch (err) {
            setError(err.message || "OTP verification failed");
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const resetPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, newPassword)=>{
        setIsLoading(true);
        setError(null);
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStore"].resetPassword(email, newPassword);
        } catch (err) {
            setError(err.message || "Password reset failed");
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const value = {
        user,
        login,
        signup,
        logout,
        requestOTP,
        verifyOTP,
        resetPassword,
        isLoading,
        error
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/auth-context.tsx",
        lineNumber: 118,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
}),
"[project]/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Data store for managing inventory state with localStorage persistence
__turbopack_context__.s([
    "store",
    ()=>store
]);
const STORAGE_KEY = "inventory_store";
const defaultStore = {
    user: null,
    products: [
        {
            id: "1",
            name: "Steel Rods",
            sku: "SR-001",
            category: "Raw Materials",
            uom: "kg",
            stock: 450,
            locationStock: {
                "main-warehouse": 300,
                "warehouse-2": 100,
                "production-floor": 50
            },
            reorderLevel: 100
        },
        {
            id: "2",
            name: "Aluminum Sheets",
            sku: "AS-002",
            category: "Raw Materials",
            uom: "sheet",
            stock: 120,
            locationStock: {
                "main-warehouse": 80,
                "warehouse-2": 40
            },
            reorderLevel: 50
        },
        {
            id: "3",
            name: "Plastic Frames",
            sku: "PF-003",
            category: "Components",
            uom: "piece",
            stock: 8,
            locationStock: {
                "production-floor": 8
            },
            reorderLevel: 20
        },
        {
            id: "4",
            name: "Rubber Seals",
            sku: "RS-004",
            category: "Components",
            uom: "piece",
            stock: 0,
            locationStock: {},
            reorderLevel: 25
        },
        {
            id: "5",
            name: "Copper Wire",
            sku: "CW-005",
            category: "Raw Materials",
            uom: "kg",
            stock: 320,
            locationStock: {
                "main-warehouse": 200,
                "production-floor": 120
            },
            reorderLevel: 75
        }
    ],
    warehouses: [
        {
            id: "main-warehouse",
            name: "Main Warehouse",
            locations: [
                "main-warehouse",
                "warehouse-2"
            ]
        },
        {
            id: "production-floor",
            name: "Production Floor",
            locations: [
                "production-floor"
            ]
        }
    ],
    locations: [
        {
            id: "main-warehouse",
            name: "Main Warehouse",
            type: "Storage",
            capacity: 1000,
            currentUsage: 450
        },
        {
            id: "warehouse-2",
            name: "Warehouse 2",
            type: "Storage",
            capacity: 500,
            currentUsage: 120
        },
        {
            id: "production-floor",
            name: "Production Floor",
            type: "Production",
            capacity: 300,
            currentUsage: 200
        }
    ],
    receipts: [],
    deliveries: [],
    transfers: [],
    adjustments: [],
    ledger: []
};
const store = {
    getStore: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return defaultStore;
        //TURBOPACK unreachable
        ;
    },
    setStore: (data)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    updateUser: (user)=>{
        const current = store.getStore();
        current.user = user;
        store.setStore(current);
    },
    addProduct: (product)=>{
        const current = store.getStore();
        const newProduct = {
            ...product,
            id: Date.now().toString(),
            // Initialize locationStock with the initial stock in main-warehouse
            locationStock: {
                "main-warehouse": product.stock || 0,
                ...product.locationStock
            }
        };
        current.products.push(newProduct);
        store.setStore(current);
        return newProduct;
    },
    updateProduct: (id, updates)=>{
        const current = store.getStore();
        const product = current.products.find((p)=>p.id === id);
        if (product) {
            Object.assign(product, updates);
            store.setStore(current);
        }
    },
    deleteProduct: (id)=>{
        const current = store.getStore();
        current.products = current.products.filter((p)=>p.id !== id);
        store.setStore(current);
    },
    addReceipt: (receipt)=>{
        const current = store.getStore();
        const newReceipt = {
            ...receipt,
            id: Date.now().toString()
        };
        current.receipts.push(newReceipt);
        store.setStore(current);
        return newReceipt;
    },
    updateReceipt: (id, updates)=>{
        const current = store.getStore();
        const receipt = current.receipts.find((r)=>r.id === id);
        if (receipt) {
            Object.assign(receipt, updates);
            store.setStore(current);
        }
    },
    addDelivery: (delivery)=>{
        const current = store.getStore();
        const newDelivery = {
            ...delivery,
            id: Date.now().toString()
        };
        current.deliveries.push(newDelivery);
        store.setStore(current);
        return newDelivery;
    },
    updateDelivery: (id, updates)=>{
        const current = store.getStore();
        const delivery = current.deliveries.find((d)=>d.id === id);
        if (delivery) {
            Object.assign(delivery, updates);
            store.setStore(current);
        }
    },
    addTransfer: (transfer)=>{
        const current = store.getStore();
        const newTransfer = {
            ...transfer,
            id: Date.now().toString()
        };
        current.transfers.push(newTransfer);
        store.setStore(current);
        return newTransfer;
    },
    updateTransfer: (id, updates)=>{
        const current = store.getStore();
        const transfer = current.transfers.find((t)=>t.id === id);
        if (transfer) {
            Object.assign(transfer, updates);
            store.setStore(current);
        }
    },
    addAdjustment: (adjustment)=>{
        const current = store.getStore();
        const newAdjustment = {
            ...adjustment,
            id: Date.now().toString()
        };
        current.adjustments.push(newAdjustment);
        store.setStore(current);
        return newAdjustment;
    },
    addLedgerEntry: (entry)=>{
        const current = store.getStore();
        const newEntry = {
            ...entry,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        current.ledger.push(newEntry);
        store.setStore(current);
    },
    updateLocationStock: (productId, locationId, quantity, operation)=>{
        const current = store.getStore();
        const productIndex = current.products.findIndex((p)=>p.id === productId);
        if (productIndex === -1) return;
        // Create a completely new product object to ensure React detects changes
        const product = {
            ...current.products[productIndex]
        };
        // Initialize locationStock if it doesn't exist
        if (!product.locationStock) {
            product.locationStock = {
                "main-warehouse": product.stock || 0
            };
        }
        // Create new locationStock object
        product.locationStock = {
            ...product.locationStock
        };
        const currentLocationStock = product.locationStock[locationId] || 0;
        switch(operation){
            case 'add':
                product.locationStock[locationId] = currentLocationStock + quantity;
                break;
            case 'subtract':
                const newStock = Math.max(0, currentLocationStock - quantity);
                product.locationStock[locationId] = newStock;
                break;
            case 'set':
                product.locationStock[locationId] = quantity;
                break;
        }
        // Recalculate total stock from all locations
        product.stock = Object.values(product.locationStock).reduce((sum, stock)=>sum + stock, 0);
        // Replace the product in the array with the new object
        current.products[productIndex] = product;
        store.setStore(current);
    },
    getLocationStock: (productId, locationId)=>{
        const current = store.getStore();
        const product = current.products.find((p)=>p.id === productId);
        return product?.locationStock[locationId] || 0;
    },
    getLowStockProducts: ()=>{
        const current = store.getStore();
        return current.products.filter((p)=>p.reorderLevel && p.stock <= p.reorderLevel);
    },
    getLocationStockSummary: (locationId)=>{
        const current = store.getStore();
        return current.products.map((product)=>({
                productId: product.id,
                productName: product.name,
                sku: product.sku,
                stock: product.locationStock[locationId] || 0,
                uom: product.uom
            })).filter((item)=>item.stock > 0);
    },
    // Utility function to migrate existing products to have proper locationStock
    migrateProductLocationStock: ()=>{
        const current = store.getStore();
        let hasChanges = false;
        current.products.forEach((product)=>{
            if (!product.locationStock || Object.keys(product.locationStock).length === 0) {
                product.locationStock = {
                    "main-warehouse": product.stock || 0
                };
                hasChanges = true;
            }
        });
        if (hasChanges) {
            store.setStore(current);
        }
    },
    getOperationStats: ()=>{
        const current = store.getStore();
        return {
            totalProducts: current.products.length,
            lowStockItems: current.products.filter((p)=>p.stock < 20).length,
            outOfStockItems: current.products.filter((p)=>p.stock === 0).length,
            pendingReceipts: current.receipts.filter((r)=>r.status === "Waiting" || r.status === "Draft").length,
            pendingDeliveries: current.deliveries.filter((d)=>d.status === "Waiting" || d.status === "Draft").length,
            scheduledTransfers: current.transfers.filter((t)=>t.status === "Waiting" || t.status === "Draft").length
        };
    }
};
}),
"[project]/contexts/store-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function StoreProvider({ children }) {
    const [storeData, setStoreData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [updateTrigger, setUpdateTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const refreshData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].getStore();
        // Create a completely new object to force React re-render
        setStoreData({
            ...data,
            products: data.products.map((p)=>({
                    ...p,
                    locationStock: {
                        ...p.locationStock
                    }
                })),
            deliveries: [
                ...data.deliveries
            ],
            receipts: [
                ...data.receipts
            ],
            transfers: [
                ...data.transfers
            ],
            adjustments: [
                ...data.adjustments
            ],
            ledger: [
                ...data.ledger
            ]
        });
        // Also trigger a counter update to ensure re-render
        setUpdateTrigger((prev)=>prev + 1);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Migrate existing products to have proper locationStock
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].migrateProductLocationStock();
        refreshData();
    }, [
        refreshData
    ]);
    const addProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((product)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].addProduct(product);
        refreshData();
    }, [
        refreshData
    ]);
    const updateProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].updateProduct(id, updates);
        refreshData();
    }, [
        refreshData
    ]);
    const deleteProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].deleteProduct(id);
        refreshData();
    }, [
        refreshData
    ]);
    const addReceipt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((receipt)=>{
        const newReceipt = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].addReceipt(receipt);
        refreshData();
        return newReceipt.id;
    }, [
        refreshData
    ]);
    const updateReceipt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].updateReceipt(id, updates);
        refreshData();
    }, [
        refreshData
    ]);
    const addDelivery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((delivery)=>{
        const newDelivery = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].addDelivery(delivery);
        refreshData();
        return newDelivery.id;
    }, [
        refreshData
    ]);
    const updateDelivery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].updateDelivery(id, updates);
        refreshData();
    }, [
        refreshData
    ]);
    const addTransfer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((transfer)=>{
        const newTransfer = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].addTransfer(transfer);
        refreshData();
        return newTransfer.id;
    }, [
        refreshData
    ]);
    const updateTransfer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].updateTransfer(id, updates);
        refreshData();
    }, [
        refreshData
    ]);
    const addAdjustment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((adjustment)=>{
        const newAdjustment = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].addAdjustment(adjustment);
        refreshData();
        return newAdjustment.id;
    }, [
        refreshData
    ]);
    const addLedgerEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((entry)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].addLedgerEntry(entry);
        refreshData();
    }, [
        refreshData
    ]);
    const updateLocationStock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((productId, locationId, quantity, operation)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].updateLocationStock(productId, locationId, quantity, operation);
        refreshData();
    }, [
        refreshData
    ]);
    const getStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].getOperationStats();
    }, []);
    const value = {
        products: storeData?.products || [],
        receipts: storeData?.receipts || [],
        deliveries: storeData?.deliveries || [],
        transfers: storeData?.transfers || [],
        adjustments: storeData?.adjustments || [],
        ledger: storeData?.ledger || [],
        locations: storeData?.locations || [],
        addProduct,
        updateProduct,
        deleteProduct,
        addReceipt,
        updateReceipt,
        addDelivery,
        updateDelivery,
        addTransfer,
        updateTransfer,
        addAdjustment,
        addLedgerEntry,
        updateLocationStock,
        getLocationStock: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].getLocationStock,
        getLowStockProducts: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].getLowStockProducts,
        getLocationStockSummary: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].getLocationStockSummary,
        getStats,
        refreshData
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/store-context.tsx",
        lineNumber: 194,
        columnNumber: 10
    }, this);
}
function useStore() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within StoreProvider");
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__68d93603._.js.map