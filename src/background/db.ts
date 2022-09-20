import Datastore from 'nedb-promises';
import path from 'path';

// DBを作成
// const db = {
//   main: Datastore.create(path.join(__dirname, 'db/main.db')),
//   record: Datastore.create(path.join(__dirname, 'db/record.db')),
//   history: Datastore.create(path.join(__dirname, 'db/history.db')),
//   customize: Datastore.create(path.join(__dirname, 'db/customize.db'))
// };

// Mainクラス
class Database {
  private db: Datastore<Document>;

  // 初期化
  constructor(db: Datastore<Document>) {
    this.db = db;
  }

  // 値の挿入
  async insertData(payload: any) {
    await this.db.insert(payload);
  }

  // 値の更新
  async updateData(query: any, payload: any) {
    await this.db.update(query, payload, { upsert: true });
    // @ts-ignore
    this.db.compactDatafile();
  }

  // 検索
  async findOneData(query: any) {
    return await this.db.findOne(query);
  }

  // 複数検索
  async findData(query: any, sort: any) {
    const db = this.db.find(query);
    return sort ? await db.sort(sort) : await db;
  }

  // 全件取得
  async getAllData() {
    return await this.db.find({});
  }
}

export default {
  Main: new Database(Datastore.create(path.join(__dirname, 'db/main.db'))),
  Record: new Database(Datastore.create(path.join(__dirname, 'db/record.db')))
};