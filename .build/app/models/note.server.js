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
var note_server_exports = {};
__export(note_server_exports, {
  createNote: () => createNote,
  deleteNote: () => deleteNote,
  getNote: () => getNote,
  getNoteListItems: () => getNoteListItems
});
module.exports = __toCommonJS(note_server_exports);
var import_user = require("./user.server");
async function getNoteListItems({ userId }) {
  const { data } = await import_user.supabase.from("notes").select("id, title").eq("profile_id", userId);
  return data;
}
async function createNote({
  title,
  body,
  userId
}) {
  const { data, error } = await import_user.supabase.from("notes").insert([{ title, body, profile_id: userId }]).single();
  if (!error) {
    return data;
  }
  return null;
}
async function deleteNote({
  id,
  userId
}) {
  const { error } = await import_user.supabase.from("notes").delete({ returning: "minimal" }).match({ id, profile_id: userId });
  if (!error) {
    return {};
  }
  return null;
}
async function getNote({
  id,
  userId
}) {
  const { data, error } = await import_user.supabase.from("notes").select("*").eq("profile_id", userId).eq("id", id).single();
  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      title: data.title,
      body: data.body
    };
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNote,
  deleteNote,
  getNote,
  getNoteListItems
});
//# sourceMappingURL=note.server.js.map
