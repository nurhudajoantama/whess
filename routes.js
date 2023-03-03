const { Router, json } = require("express");
const whatsapp = require("./routes/whatsapp");

const routes = Router();

const api = Router();
{
  api.use(json());

  api.use(whatsapp);

  api.use(function (req, res, next) {
    res.status(404).json({ error: "Not found" });
  });
}

routes.get("/", (req, res) => res.json({ ping: true }));
routes.use("/api", api);

module.exports = routes;
