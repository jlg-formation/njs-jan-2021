const express = require("express");
const serveIndex = require("serve-index");

console.log("about to start the server");

const app = express();
const port = 3000;
const public = "./public";

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

app.use(express.static(public));
app.use(serveIndex(public));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
