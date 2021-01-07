import { Router, urlencoded, json } from "express";
import { addNewArticle, deleteManyArticles, retrieveAllArticles } from "./db";
const app = Router();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", async (req, res) => {
  res.render("pages/index", { articles: await retrieveAllArticles() });
});

app.post("/actions/article-add", async (req, res) => {
  const article = req.body;
  await addNewArticle(article);
  res.redirect("/");
});

app.delete("/actions/article-remove", async (req, res) => {
  const ids: string[] = req.body;
  await deleteManyArticles(ids);
  res.status(204).end();
});

app.get("/actions/article-get", async (req, res) => {
  res.json(await retrieveAllArticles());
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
