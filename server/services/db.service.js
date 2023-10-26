class DbService {
  constructor(db) {
    this.db = db;
  }
  findOne(entity, query) {
    return this.db[entity].find((entry) => {
      let allConditionApply = true;
      for (let key in query) {
        if (query[key] !== entry[key]) {
          allConditionApply = false;
          break;
        }
      }
      if (allConditionApply) {
        return entry;
      }
    });
  }
}

export default DbService;
