import Datastore from "nedb";
import path from "path";

const db = new Datastore({
  filename: path.join(__dirname, "data.db"),
  autoload: true,
});

console.log(db);
