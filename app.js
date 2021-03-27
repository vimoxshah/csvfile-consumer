const express = require("express");
const consume = require("./consumers/csv.consumers");

const app = express();
const port = 3300;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

consume().catch((err) => {
  console.error("error in consumer: ", err);
});
