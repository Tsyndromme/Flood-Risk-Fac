"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
__export(utils_exports, {
  isUser: () => isUser,
  useMatchesData: () => useMatchesData,
  useOptionalUser: () => useOptionalUser,
  useUser: () => useUser,
  validateEmail: () => validateEmail
});
module.exports = __toCommonJS(utils_exports);
var import_react = require("react");
var import_react2 = require("@remix-run/react");
function useMatchesData(id) {
  const matchingRoutes = (0, import_react2.useMatches)();
  const route = (0, import_react.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user === "object";
}
function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return void 0;
  }
  return data.user;
}
function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}
function validateEmail(email) {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isUser,
  useMatchesData,
  useOptionalUser,
  useUser,
  validateEmail
});
//# sourceMappingURL=utils.js.map
