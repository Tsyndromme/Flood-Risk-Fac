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
var user_server_exports = {};
__export(user_server_exports, {
  createUser: () => createUser,
  getProfileByEmail: () => getProfileByEmail,
  getProfileById: () => getProfileById,
  supabase: () => supabase,
  verifyLogin: () => verifyLogin
});
module.exports = __toCommonJS(user_server_exports);
var import_supabase_js = require("@supabase/supabase-js");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
(0, import_tiny_invariant.default)(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
(0, import_tiny_invariant.default)(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);
const supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseAnonKey);
async function createUser(email, password) {
  const { user } = await supabase.auth.signUp({
    email,
    password
  });
  const profile = await getProfileByEmail(user == null ? void 0 : user.email);
  return profile;
}
async function getProfileById(id) {
  const { data, error } = await supabase.from("profiles").select("email, id").eq("id", id).single();
  if (error)
    return null;
  if (data)
    return { id: data.id, email: data.email };
}
async function getProfileByEmail(email) {
  const { data, error } = await supabase.from("profiles").select("email, id").eq("email", email).single();
  if (error)
    return null;
  if (data)
    return data;
}
async function verifyLogin(email, password) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password
  });
  if (error)
    return void 0;
  const profile = await getProfileByEmail(user == null ? void 0 : user.email);
  return profile;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  getProfileByEmail,
  getProfileById,
  supabase,
  verifyLogin
});
//# sourceMappingURL=user.server.js.map
