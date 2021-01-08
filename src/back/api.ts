import { Router } from "express";
const app = Router();

app.get("/now", (req, res) => {
  res.json({ date: new Date() });
});
app.get("/crash", async (req, res) => {
  process.exit(1);
});

export default app;
