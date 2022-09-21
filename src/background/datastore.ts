import Datastore from 'nedb-promises';
import { DatastoreObject } from '@/@types/ipc-db';
import path from 'path';

const db: DatastoreObject = {
  Main: Datastore.create(path.join(__dirname, 'save/main.db')),
  Record: Datastore.create(path.join(__dirname, 'save/record.db'))
};

export default db;