import { MongoClient, ObjectId } from "mongodb";
import { Article } from "../front/Article";

const url = "mongodb://localhost:27017";
const dbName = "gestion-stock";

let client;
let db;
async function init() {
  try {
    client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
  } catch (err) {
    console.log("err: ", err);
  }
}

init();

export async function retrieveAllArticles(): Promise<Article[]> {
  const result: any[] = await db.collection("articles").find({}).toArray();
  const articles = result.map(r => {
    r.id = r._id;
    delete r._id;
    return r;
  }) as Article[];
  return articles;
}

export async function addNewArticle(article: Article) {
  await db.collection("articles").insertOne(article);
}

export async function deleteManyArticles(ids: string[]) {
  console.log("ids: ", ids);
  try {
    const r = await db.collection("articles").deleteMany({
      _id: {
        $in: ids.map(id => new ObjectId(id)),
      },
    });
    console.log("r: ", r);
  } catch (error) {
    console.log("error: ", error);
  }
}
