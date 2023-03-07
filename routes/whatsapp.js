const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const whatsapp = require("../services/whatsapp");
const response = require("../utils/response");
const QRCode = require("qrcode");
const { BASE_URL, USER_TOKEN } = require("../config");

const routes = Router();

routes.use((req, res, next) => {
  if (!USER_TOKEN) return res.status(500).json(response.errorResponse("Please set your token first"));
  if (!req.headers.authorization) return res.status(401).json(response.errorResponse("Please provide token"));

  const token = req.headers.authorization.split(" ")[1];
  if (token !== USER_TOKEN) return res.status(401).json(response.errorResponse("Invalid token"));
  return next();
});

routes.get("/qr", (req, res) => {
  const qr = whatsapp.getQr();
  if (!qr) return res.status(404).json(response.errorResponse("Please wait for qr to be generated or you has been logged in"));
  return res.json(
    response.successResponse("Qr has been generated", {
      qr,
      img: `${BASE_URL}/api/qr-img`,
      notice: "Please get qr evry some seconds cause it will be expired and generate new qr",
    })
  );
});

routes.get("/qr-img", (req, res) => {
  const qr = whatsapp.getQr();
  if (!qr) return res.status(404).send(null);
  QRCode.toDataURL(qr, (err, url) => {
    if (err) return res.status(500).send(null);
    const img = Buffer.from(url.split(",")[1], "base64");
    return res
      .writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      })
      .end(img);
  });
});

routes.post("/message", body("phone").isMobilePhone("id-ID"), body("message").isString(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(401).json(response.errorResponse("Invalid input", errors.array()));
  const { phone, message } = req.body;

  const s = await whatsapp.sendMessage(phone, message);
  if (!s) return res.status(500).json(response.errorResponse("Failed to send message please check is you has been logged in"));
  return res.json(response.successResponse("Message has been sent", { phone, message }));
});

module.exports = routes;
