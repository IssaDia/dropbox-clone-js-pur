/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/home */ \"./src/pages/home.ts\");\n/* harmony import */ var _pages_layout_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/layout/layout */ \"./src/pages/layout/layout.ts\");\n\n\nconst init = () => {\n    if (window.location.pathname === \"/\") {\n        (0,_pages_layout_layout__WEBPACK_IMPORTED_MODULE_1__.appLayout)();\n        (0,_pages_home__WEBPACK_IMPORTED_MODULE_0__.loadHomePage)();\n    }\n};\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    console.log(\"DOMContentLoaded event fired\"), init;\n});\n\n\n//# sourceURL=webpack://dropbox/./src/index.ts?");

/***/ }),

/***/ "./src/pages/home.ts":
/*!***************************!*\
  !*** ./src/pages/home.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadHomePage: () => (/* binding */ loadHomePage)\n/* harmony export */ });\nconst loadHomePage = () => {\n    console.log(\"Loading home page\");\n};\n\n\n//# sourceURL=webpack://dropbox/./src/pages/home.ts?");

/***/ }),

/***/ "./src/pages/layout/layout.ts":
/*!************************************!*\
  !*** ./src/pages/layout/layout.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   appLayout: () => (/* binding */ appLayout)\n/* harmony export */ });\n/* harmony import */ var _utils_domUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/domUtils */ \"./src/utils/domUtils.ts\");\n\nconst appLayout = () => {\n    const root = document.getElementById(\"root\");\n    const container = (0,_utils_domUtils__WEBPACK_IMPORTED_MODULE_0__.createCustomHtmlElement)(\"div\", { classes: [\"container\"] });\n    root === null || root === void 0 ? void 0 : root.append(container);\n};\n\n\n//# sourceURL=webpack://dropbox/./src/pages/layout/layout.ts?");

/***/ }),

/***/ "./src/utils/domUtils.ts":
/*!*******************************!*\
  !*** ./src/utils/domUtils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCustomHtmlElement: () => (/* binding */ createCustomHtmlElement)\n/* harmony export */ });\nconst createCustomHtmlElement = (tagName, options) => {\n    const element = document.createElement(tagName);\n    if (options === null || options === void 0 ? void 0 : options.classes) {\n        element.classList.add(...options.classes);\n    }\n    if (options === null || options === void 0 ? void 0 : options.attributes) {\n        for (const [key, values] of Object.entries(options === null || options === void 0 ? void 0 : options.attributes)) {\n            element.setAttribute(key, values);\n        }\n    }\n    if (options === null || options === void 0 ? void 0 : options.content) {\n        if (typeof options.content === \"string\") {\n            element.innerHTML = options === null || options === void 0 ? void 0 : options.content;\n        }\n        else if ((options === null || options === void 0 ? void 0 : options.content) instanceof HTMLElement) {\n            element.appendChild(options === null || options === void 0 ? void 0 : options.content);\n        }\n        else if (Array.isArray(options === null || options === void 0 ? void 0 : options.content)) {\n            for (let htmlElement of options === null || options === void 0 ? void 0 : options.content) {\n                element.appendChild(htmlElement);\n            }\n        }\n    }\n    return element;\n};\n\n\n//# sourceURL=webpack://dropbox/./src/utils/domUtils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;