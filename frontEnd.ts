import { Router } from "express";
const app = Router();

app.get("/", (req, res) => {
  res.render("pages/index");
});

export default app;
