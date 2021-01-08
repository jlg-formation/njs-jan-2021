import assert from "assert";
import { ArticleServer } from "../src/back/ArticleServer";
import { Article } from "../src/front/Article";
import dbg from "debug";

const debug = dbg("gestion-stock:test");
describe("Error on Server", function () {
  const server = new ArticleServer({
    port: 5000,
  });

  let json: Article[] = [];

  before(async () => {
    await server.start();
  });

  after(async () => {
    await server.stop();
  });

  it("should delete all articles", async function () {
    try {
      const server2 = new ArticleServer({
        port: 5000,
      });
      await server2.start();
      assert.fail("you should not be here");
    } catch (error) {
      assert.deepStrictEqual(error.code, "EADDRINUSE");
    }
  });
});
