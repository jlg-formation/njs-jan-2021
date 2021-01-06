// Promise version >= ES6
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

appendFile("toto.txt", "promise\n")
  .then(() => appendFile("toto.txt", "promise\n"))
  .then(() => appendFile("toto.txt", "promise\n"))
  .then(() => appendFile("toto.txt", "promise\n"))
  .catch(err => console.log("err: ", err));
