import { Router, urlencoded, json } from "express";
import { addNewArticle, deleteManyArticles, retrieveAllArticles } from "./file";
const app = Router();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  (async () => {
    try {
      res.render("pages/index", { articles: await retrieveAllArticles() });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).end();
    }
  })();
});

app.post("/actions/article-add", (req, res) => {
  (async () => {
    try {
      const article = req.body;
      await addNewArticle(article);
      res.redirect("/");
    } catch (error) {
      console.log("error: ", error);
      res.status(500).end();
    }
  })();
});

app.delete("/actions/article-remove", (req, res) => {
  (async () => {
    try {
      const ids: string[] = req.body;
      await deleteManyArticles(ids);
      res.status(204).end();
    } catch (error) {
      console.log("error: ", error);
      res.status(500).end();
    }
  })();
});

app.get("/actions/article-get", (req, res) => {
  (async () => {
    try {
      res.json(await retrieveAllArticles());
    } catch (error) {
      console.log("error: ", error);
      res.status(500).end();
    }
  })();
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
