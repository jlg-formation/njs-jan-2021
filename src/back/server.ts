import express from "express";
import serveIndex from "serve-index";
import api from "./api";
import frontEnd from "./frontEnd";

console.log("about to start the server");

const app = express();
app.set("view engine", "ejs");

let port = 3000;
const www = "./public";
const nodeModules = "./node_modules";

app.use((req, res, next) => {
  console.log("req.url: ", req.url);
  next();
});

app.use("/api", api);
app.use("/", frontEnd);

app.use(express.static(www));
app.use("/node_modules", express.static(nodeModules));
app.use(serveIndex(www));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
