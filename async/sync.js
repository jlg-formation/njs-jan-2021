const fs = require("fs");

try {
  fs.appendFileSync("toto.txt", "coucou\n");
  fs.appendFileSync("toto.txt", "coucou\n");
  fs.appendFileSync("toto.txt", "coucou\n");
  fs.appendFileSync("toto.txt", "coucou\n");
} catch (err) {
  console.log("err: ", err);
}
