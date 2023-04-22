"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var session_server_exports = {};
__export(session_server_exports, {
  createUserSession: () => createUserSession,
  getSession: () => getSession,
  getUser: () => getUser,
  getUserId: () => getUserId,
  logout: () => logout,
  requireUser: () => requireUser,
  requireUserId: () => requireUserId,
  sessionStorage: () => sessionStorage
});
module.exports = __toCommonJS(session_server_exports);
var import_node = require("@remix-run/node");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
var import_user = require("./models/user.server");
(0, import_tiny_invariant.default)(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set in your environment variables."
);
const sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production"
  }
});
const USER_SESSION_KEY = "userId";
async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}
async function getUser(request) {
  const userId = await getUserId(request);
  if (userId === void 0)
    return null;
  const user = await (0, import_user.getProfileById)(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function requireUser(request) {
  const userId = await requireUserId(request);
  if (userId == void 0)
    return null;
  const profile = await (0, import_user.getProfileById)(userId);
  if (profile)
    return profile;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return (0, import_node.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  const session = await getSession(request);
  return (0, import_node.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserSession,
  getSession,
  getUser,
  getUserId,
  logout,
  requireUser,
  requireUserId,
  sessionStorage
});
//# sourceMappingURL=session.server.js.map
