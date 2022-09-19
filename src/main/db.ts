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
    return this.getAllData;
  }

  // 値の更新
  async updateData(field_name: any, payload: any) {
    await this.db.update(
      { field_name: field_name },
      { field_name: field_name, contents: payload },
      { upsert: true }
    );
    // 圧縮
    this.db.persistence.compactDatafile();
    return this.getAllData;
  }

  // 全件取得
  get getAllData() {
    return this.db.find({});
  }
}

export default {
  Main: new Database(Datastore.create(path.join(__dirname, 'db/main.db')))
};
