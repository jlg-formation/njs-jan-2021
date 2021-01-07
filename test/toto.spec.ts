import assert from "assert";
import fetch from "node-fetch";
import { Article } from "../src/Article";
describe("Article API", function () {
  it("should return the articles", async function () {
    const response = await fetch("http://localhost:3000/actions/article-get");
    console.log("response: ", response);
    const json = await response.json();
    console.log("json: ", json);
    assert(json instanceof Array);
    if (json.length === 0) {
      return;
    }
    const article: Article = json[0];
    assert(article.name);
  });
});
