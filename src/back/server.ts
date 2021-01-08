import { ArticleServer } from "./ArticleServer";

(async () => {
  try {
    const server = new ArticleServer();
    await server.start();
    console.log(
      `Example app listening at http://localhost:${server.options.port}`
    );
  } catch (error) {
    console.error("error: ", error);
  }
})();
