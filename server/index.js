const express = require("express");
const router = require("./Routers/userRoute");
const cors = require("cors");
require("./db");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(cors())
app.use(express.json());
app.use("/api/user", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
