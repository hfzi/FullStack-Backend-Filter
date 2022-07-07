const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Car";
const cors = require("cors")
const app = express();
app.use(cors())

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });

mongoose.connection.on("open", () => console.log("Veritabanı Bağlandı..."));

app.use(express.json());

const alienRouter = require("./routes/aliens");
app.use("/", alienRouter);

app.listen(4000);
