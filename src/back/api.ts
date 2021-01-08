import { Router } from "express";
const app = Router();

app.get("/now", (req, res) => {
  res.json({ date: new Date() });
});

export default app;
