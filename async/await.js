// Promise version >= ES2017
const fs = require("fs");

const appendFile = (filename, content) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filename, content, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const main = async () => {
  try {
    await appendFile("toto.txt", "await\n");
    await appendFile("toto.txt", "await\n");
    await appendFile("toto.txt", "await\n");
    await appendFile("toto.txt", "await\n");
  } catch (err) {
    console.log("err: ", err);
  }
};

main();
