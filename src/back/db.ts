import { Db, MongoClient, ObjectId } from "mongodb";
import { Article } from "../front/Article";
import dbg from "debug";

const debug = dbg("gestion-stock:db");

const url = "mongodb://localhost:27017";
const dbName = "gestion-stock";

let client: MongoClient;
let db: Db;

class Connection {
  async connect() {
    try {
      client = await MongoClient.connect(url, {
        useUnifiedTopology: true,
      });
      db = client.db(dbName);
    } catch (err) {
      console.error("err: ", err);
      throw err;
    }
  }
  async disconnect() {
    try {
      await client.close();
    } catch (error) {
      console.error("error: ", error);
      throw error;
    }
  }
}

export const connection = new Connection();

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
  debug("ids: ", ids);
  try {
    const r = await db.collection("articles").deleteMany({
      _id: {
        $in: ids.map(id => new ObjectId(id)),
      },
    });
    debug("r: ", r);
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
}
