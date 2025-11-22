module.exports = [
"[project]/lib/email-service.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_nodemailer_fde89de0._.js",
  "server/chunks/ssr/[root-of-the-server]__f13ba6b2._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/email-service.ts [app-ssr] (ecmascript)");
    });
});
}),
];