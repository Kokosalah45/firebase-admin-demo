class UsersRepository {
  constructor(dbService) {
    this.dbService = dbService;
  }

  findOne(query) {
    return this.dbService.findOne("users", query);
  }
}

export default UsersRepository;
