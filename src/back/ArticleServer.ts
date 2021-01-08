import express, { Express } from "express";
import { Server } from "http";
import serveIndex from "serve-index";
import api from "./api";
import frontEnd from "./frontEnd";

export class ArticleServer {
  app: Express;
  server: Server;
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

  start() {
    const port = process.env.NJS_SERVER_PORT || 3000;
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        resolve();
      });

      this.server.on("error", err => {
        console.log("err: ", err);
        reject(err);
      });
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      this.server.close(err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
