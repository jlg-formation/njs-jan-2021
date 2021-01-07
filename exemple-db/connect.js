const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "gestion-stock";

async function main() {
  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });

    const db = client.db(dbName);

    // create
    const article = { name: "Pince", price: 2.99, qty: 50 };
    const result = await db.collection("articles").insertOne(article);
    console.log("result: ", result.ops);

    // retrieve
    const r2 = await db.collection("articles").find({}).toArray();
    console.log("r2: ", r2);

    // update
    const r3 = await db
      .collection("articles")
      .updateOne({}, { $inc: { qty: 1 } });
    console.log("r3: ", r3);

    // delete
    var myquery = {};
    const r4 = await db.collection("articles").deleteMany(myquery);
    console.log("r4: ", r4);

    await client.close();
  } catch (err) {
    console.log("err: ", err);
  }
}

main();
