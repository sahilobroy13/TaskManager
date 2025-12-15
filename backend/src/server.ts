import http from "http";
import app from "./app";
import { connectDB } from "./config/db";
import { initSocket } from "./socket/index";

const server = http.createServer(app);

connectDB();

initSocket(server);

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
