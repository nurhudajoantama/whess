const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const { PUPPETEER_ARGS, PUPPETEER_HEADLESS } = require("../config");

const client = new Client({
  puppeteer: {
    headless: PUPPETEER_HEADLESS,
    args: PUPPETEER_ARGS,
  },
  authStrategy: new LocalAuth(),
});

let qr = null;
let ready = false;

client.on("qr", (q) => {
  qr = q;
});

client.on("ready", () => {
  ready = true;
  qr = null;
  console.log("Client is ready!");
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
  ready = false;
});

const sendMessage = async (phone, message) => {
  if (!ready) return false;
  const sanitized_number = phone.toString().replace(/[- )(]/g, "");
  const country_code = await client.getCountryCode(sanitized_number);
  const phone_number = sanitized_number.startsWith("0") ? country_code + sanitized_number.substring(1) : sanitized_number;
  const numberId = await client.getNumberId(phone_number);
  await client.sendMessage(numberId._serialized, message);
  return true;
};

const getQr = () => {
  return qr;
};

const isReady = () => {
  return ready;
};

client.initialize();

module.exports = {
  isReady,
  sendMessage,
  getQr,
};
