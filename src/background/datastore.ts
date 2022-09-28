import Datastore from 'nedb-promises';
import { DatastoreObject } from '@/background/_ipcDatastore';
import path from 'path';

const directory = process.env.NODE_ENV !== 'production' ? './' : '../';

const db: DatastoreObject = {
  Main: Datastore.create(path.join(__dirname, `${directory}save/main.db`)),
  Record: Datastore.create(path.join(__dirname, `${directory}save/record.db`))
};

export default db;
