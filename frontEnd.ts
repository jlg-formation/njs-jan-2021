import { Router, urlencoded, json } from "express";
import { Article } from "./src/Article";
const app = Router();

let articles: Article[] = [
  { id: "a1", name: "Tournevis cruciforme", price: 4.56, qty: 123 },
  { id: "a2", name: "Pince", price: 1.45, qty: 123 },
  { id: "a3", name: "Marteau", price: 2.78, qty: 123 },
  { id: "a4", name: "Tournevis", price: 2, qty: 123 },
  { id: "a5", name: "Tondeuse à gazon", price: 1234, qty: 123 },
];

let nextId = 6;

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
  res.redirect("/");
});

app.delete("/actions/article-remove", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter(a => !ids.includes(a.id));
  res.status(204).end();
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
