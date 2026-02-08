const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pnr", require("./routes/pnrRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));

// Socket.io demo
io.on("connection", (socket) => {
  console.log("User connected");

  setTimeout(() => socket.emit("orderStatus", "Preparing"), 2000);
  setTimeout(() => socket.emit("orderStatus", "Out for delivery"), 5000);
  setTimeout(() => socket.emit("orderStatus", "Delivered"), 10000);
});

const PORT = 5006;
server.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
