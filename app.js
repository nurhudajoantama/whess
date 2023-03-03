const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT, BASE_URL } = require("./config");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

const routes = require("./routes");
app.use(routes);

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on ${BASE_URL}`));

// GRACEFUL SHUTDOWN

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

let connections = [];

server.on("connection", (connection) => {
  connections.push(connection);
  connection.on("close", () => (connections = connections.filter((curr) => curr !== connection)));
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);

  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
}
