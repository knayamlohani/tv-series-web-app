/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,\n// backported and transplited with Babel, with backwards-compat fixes\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n// resolves . and .. elements in a path array with directory names there\n// must be no slashes, empty elements, or device names (c:\\) in the array\n// (so also no leading and trailing slashes - it does not distinguish\n// relative and absolute paths)\nfunction normalizeArray(parts, allowAboveRoot) {\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n\n  for (var i = parts.length - 1; i >= 0; i--) {\n    var last = parts[i];\n\n    if (last === '.') {\n      parts.splice(i, 1);\n    } else if (last === '..') {\n      parts.splice(i, 1);\n      up++;\n    } else if (up) {\n      parts.splice(i, 1);\n      up--;\n    }\n  } // if the path is allowed to go above the root, restore leading ..s\n\n\n  if (allowAboveRoot) {\n    for (; up--; up) {\n      parts.unshift('..');\n    }\n  }\n\n  return parts;\n} // path.resolve([from ...], to)\n// posix version\n\n\nexports.resolve = function () {\n  var resolvedPath = '',\n      resolvedAbsolute = false;\n\n  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {\n    var path = i >= 0 ? arguments[i] : process.cwd(); // Skip empty and invalid entries\n\n    if (typeof path !== 'string') {\n      throw new TypeError('Arguments to path.resolve must be strings');\n    } else if (!path) {\n      continue;\n    }\n\n    resolvedPath = path + '/' + resolvedPath;\n    resolvedAbsolute = path.charAt(0) === '/';\n  } // At this point the path should be resolved to a full absolute path, but\n  // handle relative paths to be safe (might happen when process.cwd() fails)\n  // Normalize the path\n\n\n  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {\n    return !!p;\n  }), !resolvedAbsolute).join('/');\n  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';\n}; // path.normalize(path)\n// posix version\n\n\nexports.normalize = function (path) {\n  var isAbsolute = exports.isAbsolute(path),\n      trailingSlash = substr(path, -1) === '/'; // Normalize the path\n\n  path = normalizeArray(filter(path.split('/'), function (p) {\n    return !!p;\n  }), !isAbsolute).join('/');\n\n  if (!path && !isAbsolute) {\n    path = '.';\n  }\n\n  if (path && trailingSlash) {\n    path += '/';\n  }\n\n  return (isAbsolute ? '/' : '') + path;\n}; // posix version\n\n\nexports.isAbsolute = function (path) {\n  return path.charAt(0) === '/';\n}; // posix version\n\n\nexports.join = function () {\n  var paths = Array.prototype.slice.call(arguments, 0);\n  return exports.normalize(filter(paths, function (p, index) {\n    if (typeof p !== 'string') {\n      throw new TypeError('Arguments to path.join must be strings');\n    }\n\n    return p;\n  }).join('/'));\n}; // path.relative(from, to)\n// posix version\n\n\nexports.relative = function (from, to) {\n  from = exports.resolve(from).substr(1);\n  to = exports.resolve(to).substr(1);\n\n  function trim(arr) {\n    var start = 0;\n\n    for (; start < arr.length; start++) {\n      if (arr[start] !== '') break;\n    }\n\n    var end = arr.length - 1;\n\n    for (; end >= 0; end--) {\n      if (arr[end] !== '') break;\n    }\n\n    if (start > end) return [];\n    return arr.slice(start, end - start + 1);\n  }\n\n  var fromParts = trim(from.split('/'));\n  var toParts = trim(to.split('/'));\n  var length = Math.min(fromParts.length, toParts.length);\n  var samePartsLength = length;\n\n  for (var i = 0; i < length; i++) {\n    if (fromParts[i] !== toParts[i]) {\n      samePartsLength = i;\n      break;\n    }\n  }\n\n  var outputParts = [];\n\n  for (var i = samePartsLength; i < fromParts.length; i++) {\n    outputParts.push('..');\n  }\n\n  outputParts = outputParts.concat(toParts.slice(samePartsLength));\n  return outputParts.join('/');\n};\n\nexports.sep = '/';\nexports.delimiter = ':';\n\nexports.dirname = function (path) {\n  if (typeof path !== 'string') path = path + '';\n  if (path.length === 0) return '.';\n  var code = path.charCodeAt(0);\n  var hasRoot = code === 47\n  /*/*/\n  ;\n  var end = -1;\n  var matchedSlash = true;\n\n  for (var i = path.length - 1; i >= 1; --i) {\n    code = path.charCodeAt(i);\n\n    if (code === 47\n    /*/*/\n    ) {\n        if (!matchedSlash) {\n          end = i;\n          break;\n        }\n      } else {\n      // We saw the first non-path separator\n      matchedSlash = false;\n    }\n  }\n\n  if (end === -1) return hasRoot ? '/' : '.';\n\n  if (hasRoot && end === 1) {\n    // return '//';\n    // Backwards-compat fix:\n    return '/';\n  }\n\n  return path.slice(0, end);\n};\n\nfunction basename(path) {\n  if (typeof path !== 'string') path = path + '';\n  var start = 0;\n  var end = -1;\n  var matchedSlash = true;\n  var i;\n\n  for (i = path.length - 1; i >= 0; --i) {\n    if (path.charCodeAt(i) === 47\n    /*/*/\n    ) {\n        // If we reached a path separator that was not part of a set of path\n        // separators at the end of the string, stop now\n        if (!matchedSlash) {\n          start = i + 1;\n          break;\n        }\n      } else if (end === -1) {\n      // We saw the first non-path separator, mark this as the end of our\n      // path component\n      matchedSlash = false;\n      end = i + 1;\n    }\n  }\n\n  if (end === -1) return '';\n  return path.slice(start, end);\n} // Uses a mixed approach for backwards-compatibility, as ext behavior changed\n// in new Node.js versions, so only basename() above is backported here\n\n\nexports.basename = function (path, ext) {\n  var f = basename(path);\n\n  if (ext && f.substr(-1 * ext.length) === ext) {\n    f = f.substr(0, f.length - ext.length);\n  }\n\n  return f;\n};\n\nexports.extname = function (path) {\n  if (typeof path !== 'string') path = path + '';\n  var startDot = -1;\n  var startPart = 0;\n  var end = -1;\n  var matchedSlash = true; // Track the state of characters (if any) we see before our first dot and\n  // after any path separator we find\n\n  var preDotState = 0;\n\n  for (var i = path.length - 1; i >= 0; --i) {\n    var code = path.charCodeAt(i);\n\n    if (code === 47\n    /*/*/\n    ) {\n        // If we reached a path separator that was not part of a set of path\n        // separators at the end of the string, stop now\n        if (!matchedSlash) {\n          startPart = i + 1;\n          break;\n        }\n\n        continue;\n      }\n\n    if (end === -1) {\n      // We saw the first non-path separator, mark this as the end of our\n      // extension\n      matchedSlash = false;\n      end = i + 1;\n    }\n\n    if (code === 46\n    /*.*/\n    ) {\n        // If this is our first dot, mark it as the start of our extension\n        if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;\n      } else if (startDot !== -1) {\n      // We saw a non-dot and non-path separator before our dot, so we should\n      // have a good chance at having a non-empty extension\n      preDotState = -1;\n    }\n  }\n\n  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot\n  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'\n  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {\n    return '';\n  }\n\n  return path.slice(startDot, end);\n};\n\nfunction filter(xs, f) {\n  if (xs.filter) return xs.filter(f);\n  var res = [];\n\n  for (var i = 0; i < xs.length; i++) {\n    if (f(xs[i], i, xs)) res.push(xs[i]);\n  }\n\n  return res;\n} // String.prototype.substr - negative index don't work in IE8\n\n\nvar substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {\n  return str.substr(start, len);\n} : function (str, start, len) {\n  if (start < 0) start = str.length + start;\n  return str.substr(start, len);\n};\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/path-browserify/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {}; // cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n  throw new Error('setTimeout has not been defined');\n}\n\nfunction defaultClearTimeout() {\n  throw new Error('clearTimeout has not been defined');\n}\n\n(function () {\n  try {\n    if (typeof setTimeout === 'function') {\n      cachedSetTimeout = setTimeout;\n    } else {\n      cachedSetTimeout = defaultSetTimout;\n    }\n  } catch (e) {\n    cachedSetTimeout = defaultSetTimout;\n  }\n\n  try {\n    if (typeof clearTimeout === 'function') {\n      cachedClearTimeout = clearTimeout;\n    } else {\n      cachedClearTimeout = defaultClearTimeout;\n    }\n  } catch (e) {\n    cachedClearTimeout = defaultClearTimeout;\n  }\n})();\n\nfunction runTimeout(fun) {\n  if (cachedSetTimeout === setTimeout) {\n    //normal enviroments in sane situations\n    return setTimeout(fun, 0);\n  } // if setTimeout wasn't available but was latter defined\n\n\n  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n    cachedSetTimeout = setTimeout;\n    return setTimeout(fun, 0);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedSetTimeout(fun, 0);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n      return cachedSetTimeout.call(null, fun, 0);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n      return cachedSetTimeout.call(this, fun, 0);\n    }\n  }\n}\n\nfunction runClearTimeout(marker) {\n  if (cachedClearTimeout === clearTimeout) {\n    //normal enviroments in sane situations\n    return clearTimeout(marker);\n  } // if clearTimeout wasn't available but was latter defined\n\n\n  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n    cachedClearTimeout = clearTimeout;\n    return clearTimeout(marker);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedClearTimeout(marker);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n      return cachedClearTimeout.call(null, marker);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n      // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n      return cachedClearTimeout.call(this, marker);\n    }\n  }\n}\n\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n  if (!draining || !currentQueue) {\n    return;\n  }\n\n  draining = false;\n\n  if (currentQueue.length) {\n    queue = currentQueue.concat(queue);\n  } else {\n    queueIndex = -1;\n  }\n\n  if (queue.length) {\n    drainQueue();\n  }\n}\n\nfunction drainQueue() {\n  if (draining) {\n    return;\n  }\n\n  var timeout = runTimeout(cleanUpNextTick);\n  draining = true;\n  var len = queue.length;\n\n  while (len) {\n    currentQueue = queue;\n    queue = [];\n\n    while (++queueIndex < len) {\n      if (currentQueue) {\n        currentQueue[queueIndex].run();\n      }\n    }\n\n    queueIndex = -1;\n    len = queue.length;\n  }\n\n  currentQueue = null;\n  draining = false;\n  runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n  var args = new Array(arguments.length - 1);\n\n  if (arguments.length > 1) {\n    for (var i = 1; i < arguments.length; i++) {\n      args[i - 1] = arguments[i];\n    }\n  }\n\n  queue.push(new Item(fun, args));\n\n  if (queue.length === 1 && !draining) {\n    runTimeout(drainQueue);\n  }\n}; // v8 likes predictible objects\n\n\nfunction Item(fun, array) {\n  this.fun = fun;\n  this.array = array;\n}\n\nItem.prototype.run = function () {\n  this.fun.apply(null, this.array);\n};\n\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\n\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) {\n  return [];\n};\n\nprocess.binding = function (name) {\n  throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () {\n  return '/';\n};\n\nprocess.chdir = function (dir) {\n  throw new Error('process.chdir is not supported');\n};\n\nprocess.umask = function () {\n  return 0;\n};\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./server/src/config sync recursive ^\\.\\/.*\\/application\\.config\\.js$":
/*!******************************************************************!*\
  !*** ./server/src/config sync ^\.\/.*\/application\.config\.js$ ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./development/application.config.js\": \"./server/src/config/development/application.config.js\",\n\t\"./production/application.config.js\": \"./server/src/config/production/application.config.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./server/src/config sync recursive ^\\\\.\\\\/.*\\\\/application\\\\.config\\\\.js$\";\n\n//# sourceURL=webpack:///./server/src/config_sync_^\\.\\/.*\\/application\\.config\\.js$?");

/***/ }),

/***/ "./server/src/config sync recursive ^\\.\\/.*\\/tvdb\\.config\\.js$":
/*!***********************************************************!*\
  !*** ./server/src/config sync ^\.\/.*\/tvdb\.config\.js$ ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./development/tvdb.config.js\": \"./server/src/config/development/tvdb.config.js\",\n\t\"./production/tvdb.config.js\": \"./server/src/config/production/tvdb.config.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./server/src/config sync recursive ^\\\\.\\\\/.*\\\\/tvdb\\\\.config\\\\.js$\";\n\n//# sourceURL=webpack:///./server/src/config_sync_^\\.\\/.*\\/tvdb\\.config\\.js$?");

/***/ }),

/***/ "./server/src/config/config-loader.js":
/*!********************************************!*\
  !*** ./server/src/config/config-loader.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NODE_ENV = \"development\";\nconsole.log('MODE', NODE_ENV);\n\nconst path = __webpack_require__(/*! path */ \"./node_modules/path-browserify/index.js\");\n\nconst tvdbConfig = __webpack_require__(\"./server/src/config sync recursive ^\\\\.\\\\/.*\\\\/tvdb\\\\.config\\\\.js$\")(\"./\" + NODE_ENV + \"/tvdb.config.js\");\n\nconst applicationConfig = __webpack_require__(\"./server/src/config sync recursive ^\\\\.\\\\/.*\\\\/application\\\\.config\\\\.js$\")(\"./\" + NODE_ENV + \"/application.config.js\");\n\nconst configs = {\n  tvdbConfig,\n  applicationConfig\n};\nmodule.exports = configs;\n\n//# sourceURL=webpack:///./server/src/config/config-loader.js?");

/***/ }),

/***/ "./server/src/config/development/application.config.js":
/*!*************************************************************!*\
  !*** ./server/src/config/development/application.config.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  port: 4000\n};\n\n//# sourceURL=webpack:///./server/src/config/development/application.config.js?");

/***/ }),

/***/ "./server/src/config/development/tvdb.config.js":
/*!******************************************************!*\
  !*** ./server/src/config/development/tvdb.config.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {console.log(\"process.env\", process);\nmodule.exports = {\n  credentials: {\n    username: process.env.TVDB_USERNAME,\n    apikey: process.env.TVDB_API_KEY,\n    uniqueId: process.env.TVDB_UNIQUE_ID\n  },\n  api: {\n    login: \"https://api.thetvdb.com/login\",\n    refreshToken: \"https://api.thetvdb.com/refresh_token\",\n    searchSeriesByName: \"https://api.thetvdb.com/search/series\",\n    getSeriesById: id => `https://api.thetvdb.com/series/${id}`,\n    getEpisodesForSeriesById: (id, page) => `https://api.thetvdb.com/series/${id}/episodes?page=${page}`,\n    getCastForSeriesById: id => `https://api.thetvdb.com/series/${id}/actors`\n  }\n};\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./server/src/config/development/tvdb.config.js?");

/***/ }),

/***/ "./server/src/config/production/application.config.js":
/*!************************************************************!*\
  !*** ./server/src/config/production/application.config.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  port: 4000\n};\n\n//# sourceURL=webpack:///./server/src/config/production/application.config.js?");

/***/ }),

/***/ "./server/src/config/production/tvdb.config.js":
/*!*****************************************************!*\
  !*** ./server/src/config/production/tvdb.config.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  credentials: {\n    username: 'knayamlohanizbg',\n    apikey: 'M0ILRD4O0KHOI9Q5',\n    uniqueId: 'AIEM6W1SCHTIPVZT'\n  },\n  api: {\n    login: \"https://api.thetvdb.com/login\",\n    refreshToken: \"https://api.thetvdb.com/refresh_token\",\n    searchSeriesByName: \"https://api.thetvdb.com/search/series\",\n    getSeriesById: id => `https://api.thetvdb.com/series/${id}`,\n    getEpisodesForSeriesById: (id, page) => `https://api.thetvdb.com/series/${id}/episodes?page=${page}`,\n    getCastForSeriesById: id => `https://api.thetvdb.com/series/${id}/actors`\n  }\n};\n\n//# sourceURL=webpack:///./server/src/config/production/tvdb.config.js?");

/***/ }),

/***/ "./server/src/provider/provider.tvdb.js":
/*!**********************************************!*\
  !*** ./server/src/provider/provider.tvdb.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const transportService = __webpack_require__(/*! ./../service/service.transport */ \"./server/src/service/service.transport.js\");\n\nconst logger = __webpack_require__(/*! ./../service/service.logger */ \"./server/src/service/service.logger.js\")(\"TVDB_PROVIDER\");\n\nconst tvdbConfig = __webpack_require__(/*! ../config/config-loader */ \"./server/src/config/config-loader.js\").tvdbConfig;\n\nlet authToken = null; // fetches auth token by loggin in tvdb\n\nasync function getAuthToken(options = {}) {\n  const response = await transportService.makePOSTRequest({\n    url: tvdbConfig.api.login,\n    params: {\n      apikey: tvdbConfig.credentials.apikey\n    }\n  }).then(apiResponse => {\n    if (apiResponse.err) {\n      throw new Error(\"Unexpected error\");\n    } else {\n      logger.info('successfully fetched auth token');\n      authToken = apiResponse.res.data.token;\n      return authToken;\n    }\n  });\n  return response;\n}\n\nasync function processResponse(apiResponse, apiRetryHandler, apiRequestOptions) {\n  err = apiResponse.err;\n  res = apiResponse.res;\n\n  if (err) {\n    if (err && err.response && err.response.status == \"401\") {\n      logger.error(\"AUTH TOKEN expired, refreshing token\");\n      authToken = await getAuthToken();\n      apiRetryResponse = await apiRetryHandler(apiRequestOptions);\n      return apiRetryResponse;\n    } else {\n      throw new Error(\"Unexpected error\");\n    } // add normal error checks\n\n  } else {\n    return apiResponse;\n  }\n} // searches series by name with auth token refresh handling\n\n\nasync function searchSeriesByName(options) {\n  response = await searchSeriesByNameOnly(options).then(apiResponse => {\n    return processResponse(apiResponse, apiRetryHandler = searchSeriesByNameOnly, options);\n  });\n  return response;\n} //searches series by name\n\n\nasync function searchSeriesByNameOnly(options) {\n  return await transportService.makeGETRequest({\n    url: `${tvdbConfig.api.searchSeriesByName}?name=${options.series.name}`,\n    config: {\n      headers: { ...getAuthorizationHeader()\n      }\n    },\n    params: {\n      name: options.series.name\n    }\n  });\n} // searches series by id with auth token refresh handling\n\n\nasync function searchSeriesById(options) {\n  response = await searchSeriesByIdOnly(options).then(apiResponse => {\n    return processResponse(apiResponse, apiRetryHandler = searchSeriesByIdOnly, options);\n  });\n  return response;\n} //searches series by id\n\n\nasync function searchSeriesByIdOnly(options) {\n  id = options.series.id;\n  logger.info('series id %s', id);\n  return await transportService.makeGETRequest({\n    url: tvdbConfig.api.getSeriesById(options.series.id),\n    config: {\n      headers: { ...getAuthorizationHeader()\n      }\n    },\n    params: {\n      name: options.series.name\n    }\n  });\n}\n\nasync function getEpisodesForSeriesWithId(options) {\n  logger.info(\"getEpisodesForSeriesWithId %s\", JSON.stringify(options));\n  response = await getEpisodesForSeriesWithIdOnly(options).then(apiResponse => {\n    return processResponse(apiResponse, apiRetryHandler = getEpisodesForSeriesWithIdOnly, options);\n  });\n  return response;\n} //searches series by id\n\n\nasync function getEpisodesForSeriesWithIdOnly(options) {\n  id = options.series.id;\n  logger.info('series id %s', id);\n  return await transportService.makeGETRequest({\n    url: tvdbConfig.api.getEpisodesForSeriesById(id, options.series.page),\n    config: {\n      headers: { ...getAuthorizationHeader()\n      }\n    }\n  });\n}\n\nasync function getCastForSeriesWithId(options) {\n  logger.info(\"getCastForSeriesWithId %s\", JSON.stringify(options));\n  response = await getCastForSeriesWithIdOnly(options).then(apiResponse => {\n    return processResponse(apiResponse, apiRetryHandler = getCastForSeriesWithIdOnly, options);\n  });\n  return response;\n} //searches series by id\n\n\nasync function getCastForSeriesWithIdOnly(options) {\n  id = options.series.id;\n  logger.info('series id %s', id);\n  return await transportService.makeGETRequest({\n    url: tvdbConfig.api.getCastForSeriesById(id),\n    config: {\n      headers: { ...getAuthorizationHeader()\n      }\n    }\n  });\n}\n\n(async function () {\n  if (authToken == null) {\n    try {\n      authToken = await getAuthToken();\n    } catch (e) {\n      throw new Error(\"Auth Token fetch Failure\");\n    }\n  }\n})(); // returns tvdb authorization token\n\n\nconst getAuthorizationHeader = () => {\n  return {\n    'Authorization': `Bearer ${authToken}`\n  };\n};\n\nmodule.exports = {\n  searchSeriesByName,\n  searchSeriesById,\n  getEpisodesForSeriesWithId,\n  getCastForSeriesWithId\n};\n\n//# sourceURL=webpack:///./server/src/provider/provider.tvdb.js?");

/***/ }),

/***/ "./server/src/route/api/route.api.tvseries.js":
/*!****************************************************!*\
  !*** ./server/src/route/api/route.api.tvseries.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const tvdbService = __webpack_require__(/*! ../../service/service.tvdb */ \"./server/src/service/service.tvdb.js\");\n\nmodule.exports = ({\n  express\n}) => {\n  const router = express.Router();\n  router.get('/api/series/', (req, res, next) => {\n    tvdbService.searchSeriesByName({\n      series: {\n        name: req.query.name\n      }\n    }).then(serviceResponse => {\n      res.send(serviceResponse);\n    });\n  });\n  router.get('/api/series/:id', (req, res, next) => {\n    tvdbService.searchSeriesById({\n      series: {\n        id: req.params.id\n      }\n    }).then(serviceResponse => {\n      res.send(serviceResponse);\n    });\n  });\n  router.get('/api/series/:id/episodes', (req, res, next) => {\n    tvdbService.getEpisodesForSeriesWithId({\n      series: {\n        id: req.params.id,\n        page: req.query.page || '1'\n      }\n    }).then(serviceResponse => {\n      res.send(serviceResponse);\n    });\n  });\n  router.get('/api/series/:id/cast', (req, res, next) => {\n    tvdbService.getCastForSeriesWithId({\n      series: {\n        id: req.params.id\n      }\n    }).then(serviceResponse => {\n      res.send(serviceResponse);\n    });\n  });\n  return router;\n};\n\n//# sourceURL=webpack:///./server/src/route/api/route.api.tvseries.js?");

/***/ }),

/***/ "./server/src/route/route.root.js":
/*!****************************************!*\
  !*** ./server/src/route/route.root.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = ({\n  express\n}) => {\n  const rootRouter = express.Router();\n\n  const apiRouter = __webpack_require__(/*! ./api/route.api.tvseries */ \"./server/src/route/api/route.api.tvseries.js\")({\n    express\n  });\n\n  rootRouter.use('/', apiRouter);\n\n  const viewRouter = __webpack_require__(/*! ./view/route.view */ \"./server/src/route/view/route.view.js\")({\n    express\n  });\n\n  rootRouter.use('/', viewRouter);\n  return rootRouter;\n};\n\n//# sourceURL=webpack:///./server/src/route/route.root.js?");

/***/ }),

/***/ "./server/src/route/view/route.view.js":
/*!*********************************************!*\
  !*** ./server/src/route/view/route.view.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__filename, __dirname) {const logger = __webpack_require__(/*! ./../../service/service.logger */ \"./server/src/service/service.logger.js\")(__filename);\n\nconst path = __webpack_require__(/*! path */ \"./node_modules/path-browserify/index.js\");\n\nmodule.exports = ({\n  express\n}) => {\n  const router = express.Router();\n  router.get('/*', (req, res, next) => {\n    logger.info('received call for %s', JSON.stringify(req.path));\n    res.sendFile('index.dist.html', {\n      root: __dirname + '../../../../../web/dist/'\n    });\n  });\n  return router;\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"server/src/route/view/route.view.js\", \"server/src/route/view\"))\n\n//# sourceURL=webpack:///./server/src/route/view/route.view.js?");

/***/ }),

/***/ "./server/src/server.js":
/*!******************************!*\
  !*** ./server/src/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname, process) {const express = __webpack_require__(/*! express */ \"express\");\n\nconst app = express();\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst appConfig = __webpack_require__(/*! ./config/config-loader */ \"./server/src/config/config-loader.js\").applicationConfig;\n\nconst PORT = appConfig.port || '5000'; // app.use(express.static(__dirname + './../../web/src/'));\n\napp.use(express.static(__dirname + './../../web/dist/'));\nconsole.log(`process.env.mode ${\"development\"}`);\napp.listen(PORT, () => {\n  console.log(`app listening ${PORT}`);\n});\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\napp.use('/', __webpack_require__(/*! ./route/route.root */ \"./server/src/route/route.root.js\")({\n  express\n}));\napp.use(function (err, req, res, next) {\n  console.error('ERROR CAUGHT ==============>', err.stack);\n  res.status(500).send('Something broke!');\n});\nprocess.on('unhandledRejection', (reason, promise) => {\n  console.log('\\n\\n\\nUNHANDLED REJECTION  ==========>', reason, promise);\n});\nprocess.on('uncaughtException', function (error) {\n  // errorManagement.handler.handleError(error);\n  // if (!errorManagement.handler.isTrustedError(error))\n  //     process.exit(1)\n  console.log('UNCAUGHT EXCEPTION =============>', error);\n}); // throw new Error(\"sdfdsf\");\n/* WEBPACK VAR INJECTION */}.call(this, \"server/src\", __webpack_require__(/*! ./../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./server/src/server.js?");

/***/ }),

/***/ "./server/src/service/service.logger.js":
/*!**********************************************!*\
  !*** ./server/src/service/service.logger.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const winston = __webpack_require__(/*! winston */ \"winston\");\n\nconst applicationConfig = __webpack_require__(/*! ../config/config-loader */ \"./server/src/config/config-loader.js\");\n\nconst NODE_ENV = \"development\";\n\nmodule.exports = module => {\n  if (!module) {\n    throw new Exception(\"Module is necessary\");\n  }\n\n  const logger = winston.createLogger({\n    transports: [new winston.transports.File({\n      filename: 'error.log',\n      level: 'error'\n    }), new winston.transports.File({\n      filename: 'tv-series.log'\n    })],\n    format: winston.format.combine(winston.format.label({\n      label: module\n    }), winston.format.timestamp({\n      format: 'YYYY-MM-DD HH:mm:ss'\n    }), winston.format.prettyPrint(), winston.format.splat(), winston.format.printf(({\n      timestamp,\n      level,\n      message,\n      meta,\n      label\n    }) => {\n      return `${timestamp} - ${label} - [${level.toUpperCase()}] - ${message}`;\n    })),\n    levels: winston.config.npm.levels\n  });\n\n  if (NODE_ENV !== 'production') {\n    logger.add(new winston.transports.Console({}));\n  }\n\n  return logger;\n};\n\n//# sourceURL=webpack:///./server/src/service/service.logger.js?");

/***/ }),

/***/ "./server/src/service/service.transport.js":
/*!*************************************************!*\
  !*** ./server/src/service/service.transport.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"axios\");\n\nconst logger = __webpack_require__(/*! ./service.logger */ \"./server/src/service/service.logger.js\")(\"TRANSPORT.JS\");\n\nasync function makeGETRequest(options) {\n  logger.info('making GET CALL url: %s headers: %s', options.url, JSON.stringify(options.config.headers));\n\n  try {\n    const res = await axios.get(options.url, { ...options.params,\n      ...options.config\n    }); // logger.info('response received, url: %s, res: %s', options.url, JSON.stringify(res.data))\n\n    return {\n      err: null,\n      res: res\n    };\n  } catch (e) {\n    logger.info('response received, url: %s, res: %s', options.url, JSON.stringify(e.response && e.response.data ? e.response.data : {}));\n    return {\n      err: e,\n      res: null\n    };\n  }\n}\n\nasync function makePOSTRequest(options) {\n  logger.info('making POST CALL url: %s data: %s', options.url, JSON.stringify(options.params));\n\n  try {\n    const res = await axios.post(options.url, { ...options.params,\n      ...options.config\n    });\n    logger.info('POST CALL response received, url: %s req: %s: res: %s', options.url, JSON.stringify(options.params), JSON.stringify(res.data));\n    return {\n      err: null,\n      res: res\n    };\n  } catch (e) {\n    //timeout case not getting data\n    logger.error('POST CALL failure url: %s msg: %s', options.url, JSON.stringify(e.response && e.response.data ? e.response.data : {}));\n    return {\n      err: e,\n      res: null\n    };\n  }\n}\n\nmodule.exports = {\n  makeGETRequest,\n  makePOSTRequest\n};\n\n//# sourceURL=webpack:///./server/src/service/service.transport.js?");

/***/ }),

/***/ "./server/src/service/service.tvdb.js":
/*!********************************************!*\
  !*** ./server/src/service/service.tvdb.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const tvdbConfig = __webpack_require__(/*! ../config/config-loader */ \"./server/src/config/config-loader.js\").tvdbConfig;\n\nconst logger = __webpack_require__(/*! ./service.logger */ \"./server/src/service/service.logger.js\")(\"TVDB.JS\");\n\nconst tvdbProvider = __webpack_require__(/*! ../provider/provider.tvdb */ \"./server/src/provider/provider.tvdb.js\");\n\nasync function searchSeriesByName(options = {}) {\n  providerResponse = await tvdbProvider.searchSeriesByName(options);\n  return {\n    err: null,\n    data: {\n      matchedSeriesList: providerResponse.res.data.data\n    }\n  };\n}\n\nasync function searchSeriesById(options = {}) {\n  providerResponse = await tvdbProvider.searchSeriesById(options);\n  return {\n    err: null,\n    data: {\n      series: providerResponse.res.data.data\n    }\n  };\n}\n\nasync function getEpisodesForSeriesWithId(options = {}) {\n  providerResponse = await tvdbProvider.getEpisodesForSeriesWithId(options);\n  return {\n    err: null,\n    data: {\n      episodes: providerResponse.res.data.data,\n      pageInfo: { ...providerResponse.res.data.links\n      }\n    }\n  };\n}\n\nasync function getCastForSeriesWithId(options = {}) {\n  providerResponse = await tvdbProvider.getCastForSeriesWithId(options);\n  return {\n    err: null,\n    data: {\n      castMembers: providerResponse.res.data.data\n    }\n  };\n}\n\nmodule.exports = {\n  searchSeriesByName,\n  searchSeriesById,\n  getEpisodesForSeriesWithId,\n  getCastForSeriesWithId\n};\n\n//# sourceURL=webpack:///./server/src/service/service.tvdb.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ })

/******/ });