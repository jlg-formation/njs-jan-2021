import { Router, urlencoded, json } from "express";
import { addNewArticle, deleteManyArticles, retrieveAllArticles } from "./file";
const app = Router();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.render("pages/index", { articles: retrieveAllArticles() });
});

app.post("/actions/article-add", (req, res) => {
  const article = req.body;
  addNewArticle(article);
  res.redirect("/");
});

app.delete("/actions/article-remove", (req, res) => {
  const ids: string[] = req.body;
  deleteManyArticles(ids);
  res.status(204).end();
});

app.get("/actions/article-get", (req, res) => {
  res.json(retrieveAllArticles());
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
