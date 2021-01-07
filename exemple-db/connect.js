const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27014";
const dbName = "gestion-stock";

async function main() {
  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });

    const db = client.db(dbName);
    console.log("db: ", db);

    await client.close();
  } catch (err) {
    console.log("err: ", err);
  }
}

main();
