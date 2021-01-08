import express, { Express } from "express";
import { Server } from "http";
import serveIndex from "serve-index";
import api from "./api";
import frontEnd from "./frontEnd";
import { connection } from "./db";
import dbg from "debug";

const debug = dbg("gestion-stock:ArticleServer");

export interface ArticleServerOpts {
  port: number;
}

export class ArticleServer {
  app: Express;
  server: Server;
  options: ArticleServerOpts;
  constructor(opts?: Partial<ArticleServerOpts>) {
    this.options = {
      port: 3000,
      ...opts,
    };

    const app = express();
    app.set("view engine", "ejs");

    const www = "./public";

    app.use((req, res, next) => {
      debug("req.url: ", req.url);
      next();
    });

    app.use("/api", api);
    app.use("/", frontEnd);

    app.use(express.static(www));
    app.use(serveIndex(www));

    this.app = app;
  }

  start() {
    const port = process.env.NJS_SERVER_PORT || this.options.port;
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(port, async () => {
        await connection.connect();
        resolve();
      });

      this.server.on("error", err => {
        debug("err: ", err);
        reject(err);
      });
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      connection.disconnect().then(() => {
        this.server.close(err => {
          /* istanbul ignore if  */
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  }
}
