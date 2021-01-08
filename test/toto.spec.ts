import assert from "assert";
import fetch from "node-fetch";
import { ArticleServer } from "../src/back/ArticleServer";
import { Article } from "../src/front/Article";
describe("Article API", function () {
  it("should return the articles", async function () {
    const server = new ArticleServer({
      port: 5000,
    });
    await server.start();
    try {
      const response = await fetch("http://localhost:5000/actions/article-get");
      console.log("response: ", response);
      const json = await response.json();
      console.log("json: ", json);
      assert(json instanceof Array);
      if (json.length === 0) {
        return;
      }
      const article: Article = json[0];
      assert(article.name);
    } finally {
      await server.stop();
    }
  });
});
