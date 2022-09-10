export interface db {
  getCustomizeData: () => any;
}

declare global {
  interface Window {
    db: db;
  }
}
