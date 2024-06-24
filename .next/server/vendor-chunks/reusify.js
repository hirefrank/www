"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/reusify";
exports.ids = ["vendor-chunks/reusify"];
exports.modules = {

/***/ "(rsc)/./node_modules/reusify/reusify.js":
/*!*****************************************!*\
  !*** ./node_modules/reusify/reusify.js ***!
  \*****************************************/
/***/ ((module) => {

eval("\n\nfunction reusify (Constructor) {\n  var head = new Constructor()\n  var tail = head\n\n  function get () {\n    var current = head\n\n    if (current.next) {\n      head = current.next\n    } else {\n      head = new Constructor()\n      tail = head\n    }\n\n    current.next = null\n\n    return current\n  }\n\n  function release (obj) {\n    tail.next = obj\n    tail = obj\n  }\n\n  return {\n    get: get,\n    release: release\n  }\n}\n\nmodule.exports = reusify\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcmV1c2lmeS9yZXVzaWZ5LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RhaWx3aW5kdWktdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvcmV1c2lmeS9yZXVzaWZ5LmpzPzZmNjkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIHJldXNpZnkgKENvbnN0cnVjdG9yKSB7XG4gIHZhciBoZWFkID0gbmV3IENvbnN0cnVjdG9yKClcbiAgdmFyIHRhaWwgPSBoZWFkXG5cbiAgZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICB2YXIgY3VycmVudCA9IGhlYWRcblxuICAgIGlmIChjdXJyZW50Lm5leHQpIHtcbiAgICAgIGhlYWQgPSBjdXJyZW50Lm5leHRcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZCA9IG5ldyBDb25zdHJ1Y3RvcigpXG4gICAgICB0YWlsID0gaGVhZFxuICAgIH1cblxuICAgIGN1cnJlbnQubmV4dCA9IG51bGxcblxuICAgIHJldHVybiBjdXJyZW50XG4gIH1cblxuICBmdW5jdGlvbiByZWxlYXNlIChvYmopIHtcbiAgICB0YWlsLm5leHQgPSBvYmpcbiAgICB0YWlsID0gb2JqXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldDogZ2V0LFxuICAgIHJlbGVhc2U6IHJlbGVhc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJldXNpZnlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/reusify/reusify.js\n");

/***/ })

};
;