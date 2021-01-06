var fs = require("fs");
var path = require("path");

console.log("current dir: ", process.cwd());

var filename = path.resolve(__dirname, "toto.txt");

fs.appendFile(filename, "async\n", err => {
  if (err) {
    console.log("err: ", err);
    return;
  }
  fs.appendFile(filename, "async\n", err => {
    if (err) {
      console.log("err: ", err);
      return;
    }
    fs.appendFile(filename, "async\n", err => {
      if (err) {
        console.log("err: ", err);
        return;
      }
      fs.appendFile(filename, "async\n", err => {
        if (err) {
          console.log("err: ", err);
          return;
        }
      });
    });
  });
});
