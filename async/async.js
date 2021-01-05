const fs = require("fs");

fs.appendFile("toto.txt", "async\n", () => {
  fs.appendFile("toto.txt", "async\n", () => {
    fs.appendFile("toto.txt", "async\n", () => {
      fs.appendFile("toto.txt", "async\n", () => {});
    });
  });
});
