const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/listings", require("./routes/listings"));
app.use("/api/user", require("./routes/visit"));

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
