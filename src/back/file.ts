import { readFileSync, writeFile } from "fs";
import { resolve } from "path";
import { Article } from "../front/Article";

const filename = resolve(__dirname, "./data/articles.json");

let articles: Article[] = [];
let nextId = 1;
try {
  const str = readFileSync(filename, { encoding: "utf-8" });
  articles = JSON.parse(str);
  nextId = Math.max(...articles.map(a => +a.id.substring(1)), 0) + 1;
} catch (error) {
  console.log("no data file found");
}

function saveArticles() {
  writeFile(filename, JSON.stringify(articles, null, 2), () => {});
}

export async function retrieveAllArticles() {
  return Promise.resolve(articles);
}

export async function addNewArticle(article: Article) {
  article.id = "a" + nextId;
  nextId++;
  console.log("article: ", article);
  articles.push(article);
  saveArticles();
}

export async function deleteManyArticles(ids: string[]) {
  articles = articles.filter(a => !ids.includes(a.id));
  saveArticles();
}
