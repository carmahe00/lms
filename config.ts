// config.ts
export const DB_URL = process.env.DB_URL || "";
export const MONGODB_DB = "brainbyte";
export const MONGOUSER = process.env.MONGOUSER || "";
export const MONGOPASSWORD = process.env.MONGOPASSWORD || "";

export const API = "http://localhost:3000/api";
export const CLIENT_SIDE = process.env.CLIENT_SIDE || "";
export const SERVER_SIDE = process.env.SERVER_SIDE || "";
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
