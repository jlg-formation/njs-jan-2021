import { Router } from "express";
const app = Router();

const articles = [
  { name: "Tournevis cruciforme", price: 4.56, qty: 123 },
  { name: "Pince", price: 1.45, qty: 123 },
  { name: "Marteau", price: 2.78, qty: 123 },
  { name: "Tournevis", price: 2, qty: 123 },
  { name: "Tondeuse à gazon", price: 1234, qty: 123 },
];

app.get("/", (req, res) => {
  res.render("pages/index", { articles });
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
