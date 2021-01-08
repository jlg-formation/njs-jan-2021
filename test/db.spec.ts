import assert from "assert";
import { Article } from "../src/front/Article";
import dbg from "debug";
import { connection, retrieveAllArticles } from "../src/back/db";

const debug = dbg("gestion-stock:test");
describe("DB API", function () {
  let json: Article[] = [];

  before(async () => {
    await connection.connect();
  });

  after(async () => {
    await connection.disconnect();
  });

  it("should test retrieveAllArticles", async function () {
    this.timeout(15000);
    const articles = await retrieveAllArticles();
    assert(articles instanceof Array);
  });
});
