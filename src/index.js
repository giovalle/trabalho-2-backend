const path = require("path");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const customers = require("./persons-router");

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "dev") {
  config({
    path: path.resolve(__dirname, "../.env"),
  });
}

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eugbm.mongodb.net/progrinternet?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conectado ao MongoDB."))
  .catch((err) => console.error(`Erro ao conectar ao MongoDB: ${err}`));

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/pessoas", customers);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
