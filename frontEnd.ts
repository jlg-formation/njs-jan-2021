import { Router, urlencoded, json } from "express";
import { Article } from "./src/Article";
import { writeFile, readFileSync } from "fs";
import { resolve } from "path";
const app = Router();

const filename = resolve(__dirname, "./data/articles.json");

let articles: Article[] = [];
let nextId = 1;
try {
  const str = readFileSync(filename, { encoding: "utf-8" });
  articles = JSON.parse(str);
  nextId = Math.max(...articles.map(a => +a.id.substring(1)), 0) + 1;
} catch (error) {
  console.log("no data file found");
}

function saveArticles() {
  writeFile(filename, JSON.stringify(articles, null, 2), () => {});
}

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.render("pages/index", { articles });
});

app.post("/actions/article-add", (req, res) => {
  const article = req.body;
  article.id = "a" + nextId;
  nextId++;
  console.log("article: ", article);
  articles.push(article);
  saveArticles();
  res.redirect("/");
});

app.delete("/actions/article-remove", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter(a => !ids.includes(a.id));
  saveArticles();
  res.status(204).end();
});

app.get("/actions/article-get", (req, res) => {
  res.json(articles);
});

app.get("/article/add", (req, res) => {
  res.render("pages/add", {
    article: {
      name: "Tournevis",
      price: 2.99,
      qty: 100,
    },
  });
});

export default app;
