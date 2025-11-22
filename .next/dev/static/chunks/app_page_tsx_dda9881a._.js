(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
var _s = __turbopack_context__.k.signature();
'use client';
import Link from "next/link";
import { ArrowRight, Package, Zap, BarChart3, TrendingUp, Shield, Boxes, Warehouse, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
export default function Home() {
    _s();
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    useEffect({
        "Home.useEffect": ()=>{
            setIsVisible(true);
            const handleMouseMove = {
                "Home.useEffect.handleMouseMove": (e)=>{
                    setMousePosition({
                        x: e.clientX,
                        y: e.clientY
                    });
                }
            }["Home.useEffect.handleMouseMove"];
            window.addEventListener('mousemove', handleMouseMove);
            return ({
                "Home.useEffect": ()=>window.removeEventListener('mousemove', handleMouseMove)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "min-h-screen bg-background relative overflow-hidden",
        children: [
            /*#__PURE__*/ _jsxDEV("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "absolute top-0 -left-4 w-[600px] h-[600px] bg-gradient-to-br from-accent/40 via-cyan-500/30 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "absolute top-0 -right-4 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500/30 via-violet-500/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "absolute -bottom-8 left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "absolute inset-0 bg-grid-pattern opacity-[0.03] parallax",
                        style: {
                            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "absolute inset-0",
                        children: [
                            ...Array(30)
                        ].map((_, i)=>/*#__PURE__*/ _jsxDEV("div", {
                                className: "absolute w-1 h-1 bg-accent/50 rounded-full animate-float shadow-[0_0_10px_rgba(6,182,212,0.5)]",
                                style: {
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    animationDuration: `${15 + Math.random() * 10}s`
                                }
                            }, i, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "absolute w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none transition-all duration-300",
                        style: {
                            left: mousePosition.x - 192,
                            top: mousePosition.y - 192
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ _jsxDEV("nav", {
                        className: "border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "w-9 h-9 bg-gradient-to-br from-accent via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/30 animate-glow relative overflow-hidden group",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV(Package, {
                                                    className: "w-5 h-5 text-white relative z-10"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("span", {
                                            className: "text-xl font-bold gradient-text",
                                            children: "StockMaster"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV(Link, {
                                            href: "/auth/login",
                                            children: /*#__PURE__*/ _jsxDEV(Button, {
                                                variant: "ghost",
                                                className: "magnetic-btn hover:bg-accent/10 transition-all duration-300 relative group overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ _jsxDEV("span", {
                                                        className: "relative z-10",
                                                        children: "Sign In"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV(Link, {
                                            href: "/auth/signup",
                                            children: /*#__PURE__*/ _jsxDEV(Button, {
                                                className: "magnetic-btn bg-gradient-to-r from-accent via-cyan-500 to-blue-500 hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group",
                                                children: [
                                                    /*#__PURE__*/ _jsxDEV("span", {
                                                        className: "relative z-10 flex items-center gap-2",
                                                        children: [
                                                            "Get Started",
                                                            /*#__PURE__*/ _jsxDEV(Sparkles, {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 89,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("section", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "text-center space-y-8 animate-fade-in-up",
                            children: [
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent backdrop-blur-sm animate-bounce-slow",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV(Zap, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("span", {
                                            children: "Industry-Leading Inventory Solution"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("h1", {
                                    className: "text-5xl sm:text-7xl font-bold text-foreground leading-tight animate-gradient",
                                    children: [
                                        "Modern Inventory",
                                        " ",
                                        /*#__PURE__*/ _jsxDEV("span", {
                                            className: "bg-gradient-to-r from-accent via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x",
                                            children: "Management"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        "System"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("p", {
                                    className: "text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
                                    children: [
                                        "Digitize and streamline all stock-related operations. Replace manual registers with",
                                        " ",
                                        /*#__PURE__*/ _jsxDEV("span", {
                                            className: "text-accent font-semibold",
                                            children: "real-time"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        ", centralized inventory tracking powered by advanced analytics."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex flex-col sm:flex-row gap-4 justify-center pt-8",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV(Link, {
                                            href: "/auth/signup",
                                            children: /*#__PURE__*/ _jsxDEV(Button, {
                                                size: "lg",
                                                className: "gap-2 bg-gradient-to-r from-accent to-accent/80 hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 text-base px-8 py-6 rounded-xl group",
                                                children: [
                                                    "Start Free Trial",
                                                    /*#__PURE__*/ _jsxDEV(ArrowRight, {
                                                        className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV(Link, {
                                            href: "/auth/login",
                                            children: /*#__PURE__*/ _jsxDEV(Button, {
                                                size: "lg",
                                                variant: "outline",
                                                className: "gap-2 bg-background/50 backdrop-blur-sm border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:scale-105 text-base px-8 py-6 rounded-xl group",
                                                children: [
                                                    "Watch Demo",
                                                    /*#__PURE__*/ _jsxDEV(Zap, {
                                                        className: "w-5 h-5 group-hover:rotate-12 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "text-center space-y-2 animate-fade-in-up animation-delay-200",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "text-3xl sm:text-4xl font-bold text-accent",
                                                    children: "50K+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Active Users"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "text-center space-y-2 animate-fade-in-up animation-delay-400",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "text-3xl sm:text-4xl font-bold text-accent",
                                                    children: "99.9%"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Uptime"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "text-center space-y-2 animate-fade-in-up animation-delay-600",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "text-3xl sm:text-4xl font-bold text-accent",
                                                    children: "24/7"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV("div", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Support"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("section", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "text-center mb-16 animate-fade-in-up",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("h2", {
                                        className: "text-4xl font-bold text-foreground mb-4",
                                        children: [
                                            "Everything You Need to",
                                            " ",
                                            /*#__PURE__*/ _jsxDEV("span", {
                                                className: "text-accent",
                                                children: "Manage Inventory"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-muted-foreground text-lg max-w-2xl mx-auto",
                                        children: "Powerful features designed to streamline your operations and boost productivity"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
                                children: [
                                    {
                                        icon: BarChart3,
                                        title: "Real-Time Dashboard",
                                        desc: "Monitor KPIs, stock levels, and pending operations at a glance with live updates",
                                        gradient: "from-blue-500/10 to-cyan-500/10",
                                        iconColor: "text-blue-500"
                                    },
                                    {
                                        icon: Package,
                                        title: "Smart Stock Operations",
                                        desc: "Manage receipts, deliveries, transfers, and adjustments with intelligent automation",
                                        gradient: "from-purple-500/10 to-pink-500/10",
                                        iconColor: "text-purple-500"
                                    },
                                    {
                                        icon: Shield,
                                        title: "Enterprise Security",
                                        desc: "Bank-level encryption with role-based access control and audit trails",
                                        gradient: "from-green-500/10 to-emerald-500/10",
                                        iconColor: "text-green-500"
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Advanced Analytics",
                                        desc: "Gain insights with predictive analytics and customizable reports",
                                        gradient: "from-orange-500/10 to-red-500/10",
                                        iconColor: "text-orange-500"
                                    },
                                    {
                                        icon: Boxes,
                                        title: "Multi-Location Support",
                                        desc: "Manage inventory across multiple warehouses and locations seamlessly",
                                        gradient: "from-indigo-500/10 to-violet-500/10",
                                        iconColor: "text-indigo-500"
                                    },
                                    {
                                        icon: Warehouse,
                                        title: "Automated Alerts",
                                        desc: "Get notified of low stock, expiring items, and critical events instantly",
                                        gradient: "from-yellow-500/10 to-amber-500/10",
                                        iconColor: "text-yellow-600"
                                    }
                                ].map((feature, index)=>/*#__PURE__*/ _jsxDEV("div", {
                                        className: `group p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in-up cursor-pointer`,
                                        style: {
                                            animationDelay: `${index * 100}ms`
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: `w-14 h-14 rounded-xl bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.iconColor}`,
                                                children: /*#__PURE__*/ _jsxDEV(feature.icon, {
                                                    className: "w-7 h-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("h3", {
                                                className: "text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors",
                                                children: feature.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("p", {
                                                className: "text-muted-foreground leading-relaxed",
                                                children: feature.desc
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("section", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-3xl p-12 border border-accent/20 backdrop-blur-sm",
                            children: /*#__PURE__*/ _jsxDEV("div", {
                                className: "grid lg:grid-cols-2 gap-12 items-center",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("h2", {
                                                className: "text-4xl font-bold text-foreground",
                                                children: [
                                                    "Why Choose",
                                                    " ",
                                                    /*#__PURE__*/ _jsxDEV("span", {
                                                        className: "bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent",
                                                        children: "StockMaster"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 19
                                                    }, this),
                                                    "?"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("p", {
                                                className: "text-muted-foreground text-lg",
                                                children: "Join thousands of businesses that trust StockMaster for their inventory management needs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "space-y-4",
                                                children: [
                                                    "Real-time inventory tracking across all locations",
                                                    "Automated low stock alerts and notifications",
                                                    "Comprehensive audit trail for compliance",
                                                    "Mobile-friendly responsive design",
                                                    "Easy integration with existing systems"
                                                ].map((benefit, index)=>/*#__PURE__*/ _jsxDEV("div", {
                                                        className: "flex items-start gap-3 animate-fade-in-left",
                                                        style: {
                                                            animationDelay: `${index * 100}ms`
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ _jsxDEV(CheckCircle2, {
                                                                className: "w-6 h-6 text-accent flex-shrink-0 mt-0.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ _jsxDEV("span", {
                                                                className: "text-foreground",
                                                                children: benefit
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl blur-3xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "relative bg-background/50 backdrop-blur-sm rounded-2xl border border-border p-8 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "flex items-center gap-4 p-4 bg-accent/10 rounded-xl border border-accent/20",
                                                        children: [
                                                            /*#__PURE__*/ _jsxDEV("div", {
                                                                className: "w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center",
                                                                children: /*#__PURE__*/ _jsxDEV(Package, {
                                                                    className: "w-6 h-6 text-accent"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 274,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ _jsxDEV("div", {
                                                                children: [
                                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                                        className: "font-semibold text-foreground",
                                                                        children: "Stock Level: Normal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 277,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                                        className: "text-sm text-muted-foreground",
                                                                        children: "1,245 items in inventory"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 278,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20",
                                                        children: [
                                                            /*#__PURE__*/ _jsxDEV("div", {
                                                                className: "w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center",
                                                                children: /*#__PURE__*/ _jsxDEV(TrendingUp, {
                                                                    className: "w-6 h-6 text-green-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 282,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ _jsxDEV("div", {
                                                                children: [
                                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                                        className: "font-semibold text-foreground",
                                                                        children: "Sales: +24%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 286,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                                        className: "text-sm text-muted-foreground",
                                                                        children: "Compared to last month"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 287,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20",
                                                        children: [
                                                            /*#__PURE__*/ _jsxDEV("div", {
                                                                className: "w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center",
                                                                children: /*#__PURE__*/ _jsxDEV(BarChart3, {
                                                                    className: "w-6 h-6 text-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 292,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ _jsxDEV("div", {
                                                                children: [
                                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                                        className: "font-semibold text-foreground",
                                                                        children: "Performance: Optimal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 295,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                                        className: "text-sm text-muted-foreground",
                                                                        children: "All systems operational"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("section", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent via-purple-500 to-blue-500 p-12 text-center animate-gradient-x",
                            children: [
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "absolute inset-0 bg-grid-pattern opacity-10"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "relative z-10 space-y-6",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("h2", {
                                            className: "text-4xl font-bold text-white",
                                            children: "Ready to Transform Your Inventory Management?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("p", {
                                            className: "text-white/90 text-lg max-w-2xl mx-auto",
                                            children: "Join thousands of businesses using StockMaster to streamline their operations"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "flex flex-col sm:flex-row gap-4 justify-center pt-4",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV(Link, {
                                                    href: "/auth/signup",
                                                    children: /*#__PURE__*/ _jsxDEV(Button, {
                                                        size: "lg",
                                                        className: "bg-white text-accent hover:bg-white/90 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base px-8 py-6 rounded-xl group",
                                                        children: [
                                                            "Start Free Trial",
                                                            /*#__PURE__*/ _jsxDEV(ArrowRight, {
                                                                className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV(Link, {
                                                    href: "/auth/login",
                                                    children: /*#__PURE__*/ _jsxDEV(Button, {
                                                        size: "lg",
                                                        variant: "outline",
                                                        className: "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-base px-8 py-6 rounded-xl",
                                                        children: "Sign In"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 307,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("footer", {
                        className: "border-t border-border/50 bg-background/50 backdrop-blur-sm mt-20",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4",
                            children: [
                                /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex items-center justify-center gap-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "w-8 h-8 bg-accent rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ _jsxDEV(Package, {
                                                className: "w-5 h-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("span", {
                                            className: "text-lg font-bold text-foreground",
                                            children: "StockMaster"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV("p", {
                                    className: "text-muted-foreground text-sm",
                                    children: "© 2025 StockMaster. All rights reserved. Built with ❤️ for better inventory management."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Home, "WAYU0z37kLQ85M2NCt4qjvAwzRE=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_page_tsx_dda9881a._.js.map