import Datastore from 'nedb-promises';
import { DatastoreObject } from '@/background/_ipcDatastore';
import path from 'path';

const db: DatastoreObject = {
  Main: Datastore.create(path.join(__dirname, './assets/save/main.db')),
  Record: Datastore.create(path.join(__dirname, './assets/save/record.db'))
};

export default db;
