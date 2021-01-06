// Promise version >= ES2017
const fs = require("fs");

const appendFile = fs.promises.appendFile;
const filename = "toto.txt";

const main = async () => {
  try {
    await appendFile(filename, "await\n");
    await appendFile(filename, "await\n");
    await appendFile(filename, "await\n");
    await appendFile(filename, "await\n");
  } catch (err) {
    console.log("err: ", err);
  }
};

main();
