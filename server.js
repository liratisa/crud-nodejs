const express = require("express");
const bp = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

require("./src/Routes/index")(app);

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000");
});
