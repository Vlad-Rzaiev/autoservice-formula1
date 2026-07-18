module.exports = [
"[next]/internal/font/google/geist_da832ead.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_da832ead-module__aN_Ytq__className",
  "variable": "geist_da832ead-module__aN_Ytq__variable",
});
}),
"[next]/internal/font/google/geist_da832ead.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_da832ead$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_da832ead.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_da832ead$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_da832ead$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_da832ead$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/plus_jakarta_sans_b12fdfaf.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "plus_jakarta_sans_b12fdfaf-module__MnhKkq__className",
});
}),
"[next]/internal/font/google/plus_jakarta_sans_b12fdfaf.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$plus_jakarta_sans_b12fdfaf$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/plus_jakarta_sans_b12fdfaf.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$plus_jakarta_sans_b12fdfaf$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$plus_jakarta_sans_b12fdfaf$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$plus_jakarta_sans_b12fdfaf$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/apps/web/src/i18n/routing.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [app-rsc] (ecmascript) <export default as defineRouting>");
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        "uk",
        "en",
        "pl"
    ],
    defaultLocale: "pl"
});
}),
"[project]/apps/web/src/messages/modules.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translationModules",
    ()=>translationModules
]);
const translationModules = [
    "auth",
    "clients",
    "dashboard",
    "marketing",
    "metadata",
    "mobile-menu"
];
}),
"[project]/apps/web/src/messages/load-messages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadMessages",
    ()=>loadMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$messages$2f$modules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/messages/modules.ts [app-rsc] (ecmascript)");
;
async function loadMessages(locale) {
    const loadedMessages = {};
    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$messages$2f$modules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["translationModules"].map(async (moduleName)=>{
        const moduleMessages = (await __turbopack_context__.f({
            "../messages//en/auth.json": {
                id: ()=>"[project]/apps/web/src/messages/en/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//en/clients.json": {
                id: ()=>"[project]/apps/web/src/messages/en/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//en/dashboard.json": {
                id: ()=>"[project]/apps/web/src/messages/en/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//en/marketing.json": {
                id: ()=>"[project]/apps/web/src/messages/en/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//en/metadata.json": {
                id: ()=>"[project]/apps/web/src/messages/en/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//en/mobile-menu.json": {
                id: ()=>"[project]/apps/web/src/messages/en/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//pl/auth.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//pl/clients.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//pl/dashboard.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//pl/marketing.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//pl/metadata.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//pl/mobile-menu.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//uk/auth.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//uk/clients.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//uk/dashboard.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//uk/marketing.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//uk/metadata.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages//uk/mobile-menu.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/en/auth.json": {
                id: ()=>"[project]/apps/web/src/messages/en/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/en/clients.json": {
                id: ()=>"[project]/apps/web/src/messages/en/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/en/dashboard.json": {
                id: ()=>"[project]/apps/web/src/messages/en/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/en/marketing.json": {
                id: ()=>"[project]/apps/web/src/messages/en/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/en/metadata.json": {
                id: ()=>"[project]/apps/web/src/messages/en/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/en/mobile-menu.json": {
                id: ()=>"[project]/apps/web/src/messages/en/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/en/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/pl/auth.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/pl/clients.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/pl/dashboard.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/pl/marketing.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/pl/metadata.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/pl/mobile-menu.json": {
                id: ()=>"[project]/apps/web/src/messages/pl/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/pl/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/uk/auth.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/auth.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/uk/clients.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/clients.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/uk/dashboard.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/dashboard.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/uk/marketing.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/marketing.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/uk/metadata.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/metadata.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            },
            "../messages/uk/mobile-menu.json": {
                id: ()=>"[project]/apps/web/src/messages/uk/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/apps/web/src/messages/uk/mobile-menu.json.[json].cjs [app-rsc] (ecmascript, async loader)")
            }
        }).import(`../messages/${locale}/${moduleName}.json`)).default;
        loadedMessages[moduleName] = moduleMessages;
    }));
    return loadedMessages;
}
}),
"[project]/apps/web/src/i18n/request.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [app-rsc] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/i18n/routing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$messages$2f$load$2d$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/messages/load-messages.ts [app-rsc] (ecmascript)");
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    let locale = await requestLocale;
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$messages$2f$load$2d$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadMessages"])(locale)
    };
});
}),
"[project]/apps/web/src/providers/mobile-menu-provider.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenuProvider",
    ()=>MobileMenuProvider,
    "useMobileMenu",
    ()=>useMobileMenu
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const MobileMenuProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MobileMenuProvider() from the server but MobileMenuProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/providers/mobile-menu-provider.tsx <module evaluation>", "MobileMenuProvider");
const useMobileMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useMobileMenu() from the server but useMobileMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/providers/mobile-menu-provider.tsx <module evaluation>", "useMobileMenu");
}),
"[project]/apps/web/src/providers/mobile-menu-provider.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenuProvider",
    ()=>MobileMenuProvider,
    "useMobileMenu",
    ()=>useMobileMenu
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const MobileMenuProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MobileMenuProvider() from the server but MobileMenuProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/providers/mobile-menu-provider.tsx", "MobileMenuProvider");
const useMobileMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useMobileMenu() from the server but useMobileMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/providers/mobile-menu-provider.tsx", "useMobileMenu");
}),
"[project]/apps/web/src/providers/mobile-menu-provider.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$mobile$2d$menu$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/providers/mobile-menu-provider.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$mobile$2d$menu$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/providers/mobile-menu-provider.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$mobile$2d$menu$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/providers/theme-provider.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/apps/web/src/providers/theme-provider.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/providers/theme-provider.tsx <module evaluation>", "default");
}),
"[project]/apps/web/src/providers/theme-provider.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/apps/web/src/providers/theme-provider.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/providers/theme-provider.tsx", "default");
}),
"[project]/apps/web/src/providers/theme-provider.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/providers/theme-provider.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/providers/theme-provider.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/app/components/common/client-gate.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/apps/web/src/app/components/common/client-gate.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/app/components/common/client-gate.tsx <module evaluation>", "default");
}),
"[project]/apps/web/src/app/components/common/client-gate.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/apps/web/src/app/components/common/client-gate.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/app/components/common/client-gate.tsx", "default");
}),
"[project]/apps/web/src/app/components/common/client-gate.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$components$2f$common$2f$client$2d$gate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/components/common/client-gate.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$components$2f$common$2f$client$2d$gate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/components/common/client-gate.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$components$2f$common$2f$client$2d$gate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_da832ead$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_da832ead.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$plus_jakarta_sans_b12fdfaf$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/plus_jakarta_sans_b12fdfaf.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getLocale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getLocale$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getLocale.js [app-rsc] (ecmascript) <export default as getLocale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$mobile$2d$menu$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/providers/mobile-menu-provider.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/providers/theme-provider.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$components$2f$common$2f$client$2d$gate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/components/common/client-gate.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
async function RootLayout({ children }) {
    const locale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getLocale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getLocale$3e$__["getLocale"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: locale,
        suppressHydrationWarning: true,
        className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_da832ead$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            id: "top",
            className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$plus_jakarta_sans_b12fdfaf$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$providers$2f$mobile$2d$menu$2d$provider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MobileMenuProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$components$2f$common$2f$client$2d$gate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/layout.tsx",
                        lineNumber: 31,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/layout.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/layout.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/layout.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/layout.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1vehojo._.js.map