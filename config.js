require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const url_port = BASE_URL.split(":");
const PORT = url_port.length > 2 ? url_port[2] : 3000;

module.exports = {
  PORT,
  BASE_URL,

  // DATA
  SESSION_FILE_PATH: process.env.SESSION_FILE_PATH || "./session.json",

  USER_TOKEN: process.env.USER_TOKEN || false,

  // PUPPETEER
  PUPPETEER_HEADLESS: true,
  PUPPETEER_ARGS: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--single-process", // <- this one doesn't works in Windows
    "--disable-gpu",
  ],
};
