import assert from "assert";
import fetch from "node-fetch";
import { ArticleServer } from "../src/back/ArticleServer";
import { Article } from "../src/front/Article";
import dbg from "debug";

const debug = dbg("gestion-stock:test");
describe("Article API", function () {
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
    const response = await fetch(
      "http://localhost:5000/actions/article-remove",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(json.map(a => a.id)),
      }
    );
    assert.deepStrictEqual(response.status, 204);
  });

  it("should add one article", async function () {
    const article = { name: "tournevis", price: 2.11, qty: 123 };
    const response = await fetch("http://localhost:5000/actions/article-add", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(article),
    });
    assert.deepStrictEqual(response.status, 200);
  });

  it("should return the articles", async function () {
    const response = await fetch("http://localhost:5000/actions/article-get");
    debug("response: ", response);
    json = await response.json();
    debug("json: ", json);
    assert(json instanceof Array);
    if (json.length === 0) {
      return;
    }
    const article: Article = json[0];
    assert(article.name);
  });
});
