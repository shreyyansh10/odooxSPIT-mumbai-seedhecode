module.exports = [
"[project]/app/dashboard/products/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import { useStore } from "@/contexts/store-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2, Edit2 } from "lucide-react";
import { ProductDialog } from "@/components/products/product-dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
export default function ProductsPage() {
    const { products, deleteProduct, updateProduct } = useStore();
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [stockFilter, setStockFilter] = useState("all");
    const [showDialog, setShowDialog] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const filteredProducts = products.filter((p)=>{
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
        let matchesStock = true;
        if (stockFilter === "instock") matchesStock = p.stock > 20;
        if (stockFilter === "lowstock") matchesStock = p.stock > 0 && p.stock <= 20;
        if (stockFilter === "outofstock") matchesStock = p.stock === 0;
        return matchesSearch && matchesCategory && matchesStock;
    });
    const categories = Array.from(new Set(products.map((p)=>p.category)));
    const handleEdit = (product)=>{
        setEditingProduct(product);
        setShowDialog(true);
    };
    const handleDelete = (id)=>{
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };
    const stats = {
        total: products.length,
        inStock: products.filter((p)=>p.stock > 20).length,
        lowStock: products.filter((p)=>p.stock > 0 && p.stock <= 20).length,
        outOfStock: products.filter((p)=>p.stock === 0).length
    };
    const getStockStatus = (stock)=>{
        if (stock === 0) return {
            label: "Out of Stock",
            color: "bg-red-500/20 text-red-600 dark:text-red-400"
        };
        if (stock < 20) return {
            label: "Low Stock",
            color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
        };
        return {
            label: "In Stock",
            color: "bg-green-500/20 text-green-600 dark:text-green-400"
        };
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ _jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        children: [
                            /*#__PURE__*/ _jsxDEV("h1", {
                                className: "text-3xl font-bold text-foreground",
                                children: "Products"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-muted-foreground mt-2",
                                children: "Manage your inventory products and categories"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV(Button, {
                        onClick: ()=>{
                            setEditingProduct(null);
                            setShowDialog(true);
                        },
                        className: "gap-2",
                        children: [
                            /*#__PURE__*/ _jsxDEV(Plus, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            "Add Product"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/products/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "grid md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ _jsxDEV(Card, {
                        className: "p-4 border border-border bg-card/50",
                        children: [
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-muted-foreground text-sm",
                                children: "Total Products"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-2xl font-bold text-foreground mt-1",
                                children: stats.total
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV(Card, {
                        className: "p-4 border border-border bg-card/50",
                        children: [
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-muted-foreground text-sm",
                                children: "In Stock"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-2xl font-bold text-green-600 dark:text-green-400 mt-1",
                                children: stats.inStock
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV(Card, {
                        className: "p-4 border border-border bg-card/50",
                        children: [
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-muted-foreground text-sm",
                                children: "Low Stock"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1",
                                children: stats.lowStock
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV(Card, {
                        className: "p-4 border border-border bg-card/50",
                        children: [
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-muted-foreground text-sm",
                                children: "Out of Stock"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-2xl font-bold text-destructive mt-1",
                                children: stats.outOfStock
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/products/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV(StockTestComponent, {}, void 0, false, {
                fileName: "[project]/app/dashboard/products/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV(Card, {
                className: "p-6 border border-border bg-card/50",
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "space-y-4 mb-6",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex gap-4",
                                children: /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex-1 relative",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV(Search, {
                                            className: "absolute left-3 top-3 w-5 h-5 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/products/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV(Input, {
                                            placeholder: "Search by product name or SKU...",
                                            value: search,
                                            onChange: (e)=>setSearch(e.target.value),
                                            className: "pl-10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/products/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex gap-4 flex-wrap",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("select", {
                                        value: categoryFilter,
                                        onChange: (e)=>setCategoryFilter(e.target.value),
                                        className: "px-3 py-2 bg-input border border-input rounded-lg text-foreground text-sm",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "all",
                                                children: "All Categories"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 124,
                                                columnNumber: 15
                                            }, this),
                                            categories.map((cat)=>/*#__PURE__*/ _jsxDEV("option", {
                                                    value: cat,
                                                    children: cat
                                                }, cat, false, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/products/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("select", {
                                        value: stockFilter,
                                        onChange: (e)=>setStockFilter(e.target.value),
                                        className: "px-3 py-2 bg-input border border-input rounded-lg text-foreground text-sm",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "all",
                                                children: "All Stock Levels"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "instock",
                                                children: "In Stock"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "lowstock",
                                                children: "Low Stock"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "outofstock",
                                                children: "Out of Stock"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/products/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/products/page.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ _jsxDEV("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ _jsxDEV("thead", {
                                    children: /*#__PURE__*/ _jsxDEV("tr", {
                                        className: "border-b border-border",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "SKU"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "Total Stock"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "Locations"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("th", {
                                                className: "text-left py-3 px-4 font-semibold text-foreground",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/products/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("tbody", {
                                    children: filteredProducts.length > 0 ? filteredProducts.map((product)=>{
                                        const statusInfo = getStockStatus(product.stock);
                                        return /*#__PURE__*/ _jsxDEV("tr", {
                                            className: "border-b border-border hover:bg-secondary/50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4 font-medium text-foreground",
                                                    children: product.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4 font-mono text-xs text-muted-foreground",
                                                    children: product.sku
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4 text-muted-foreground",
                                                    children: product.category
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4 font-semibold",
                                                    children: [
                                                        product.stock,
                                                        " ",
                                                        product.uom
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4",
                                                    children: /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "flex flex-wrap gap-1",
                                                        children: Object.entries(product.locationStock || {}).map(([locationId, stock])=>{
                                                            if (stock > 0) {
                                                                return /*#__PURE__*/ _jsxDEV(Badge, {
                                                                    variant: "outline",
                                                                    className: "text-xs",
                                                                    children: [
                                                                        locationId,
                                                                        ": ",
                                                                        stock
                                                                    ]
                                                                }, locationId, true, {
                                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 33
                                                                }, this);
                                                            }
                                                            return null;
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/products/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4",
                                                    children: /*#__PURE__*/ _jsxDEV(Badge, {
                                                        variant: "secondary",
                                                        className: statusInfo.color,
                                                        children: statusInfo.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/products/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("td", {
                                                    className: "py-3 px-4 flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ _jsxDEV(Button, {
                                                            size: "sm",
                                                            variant: "ghost",
                                                            onClick: ()=>handleEdit(product),
                                                            className: "h-8 w-8 p-0",
                                                            children: /*#__PURE__*/ _jsxDEV(Edit2, {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/products/page.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ _jsxDEV(Button, {
                                                            size: "sm",
                                                            variant: "ghost",
                                                            onClick: ()=>handleDelete(product.id),
                                                            className: "h-8 w-8 p-0",
                                                            children: /*#__PURE__*/ _jsxDEV(Trash2, {
                                                                className: "w-4 h-4 text-destructive"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/products/page.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/products/page.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, product.id, true, {
                                            fileName: "[project]/app/dashboard/products/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 21
                                        }, this);
                                    }) : /*#__PURE__*/ _jsxDEV("tr", {
                                        children: /*#__PURE__*/ _jsxDEV("td", {
                                            colSpan: 6,
                                            className: "py-8 text-center text-muted-foreground",
                                            children: "No products found"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/products/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/products/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/products/page.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/products/page.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/products/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/products/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            showDialog && /*#__PURE__*/ _jsxDEV(ProductDialog, {
                product: editingProduct,
                onClose: ()=>setShowDialog(false)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/products/page.tsx",
                lineNumber: 216,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/products/page.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_dashboard_products_page_tsx_61f7f9ee._.js.map