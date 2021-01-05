const express = require("express");
const serveIndex = require("serve-index");
const api = require("./api");

console.log("about to start the server");

const app = express();
let port = 3000;
const public = "./public";

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

app.use("/api", api);

app.use(express.static(public));
app.use(serveIndex(public));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
