import { ArticleServer } from "./ArticleServer";

(async () => {
  try {
    const server = new ArticleServer();
    await server.start();
  } catch (error) {
    console.error("error: ", error);
  }
})();
