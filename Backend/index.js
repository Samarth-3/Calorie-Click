const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
};

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

app.use(cors(corsOptions));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/imgs", require("./routes/img"));
app.use("/api/nutrientlog", require("./routes/nutrientlog"));

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
