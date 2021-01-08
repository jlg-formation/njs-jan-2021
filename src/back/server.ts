import { ArticleServer } from "./ArticleServer";

(async () => {
  console.log("about to start the server");
  const server = new ArticleServer();
  await server.start();
})();
