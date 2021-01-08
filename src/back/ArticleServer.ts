import express, { Express } from "express";
import serveIndex from "serve-index";
import api from "./api";
import frontEnd from "./frontEnd";

export class ArticleServer {
  app: Express;
  constructor() {
    const app = express();
    app.set("view engine", "ejs");

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

    this.app = app;
  }

  async start() {
    const port = process.env.NJS_SERVER_PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }

  async stop() {}
}
