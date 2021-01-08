import { ArticleServer } from "./ArticleServer";

(async () => {
  try {
    console.log("about to start the server");
    const server = new ArticleServer();
    await server.start();
  } catch (error) {
    console.log("error: ", error);
  }
})();
