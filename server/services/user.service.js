import UsersRepository from "../repositories/users.repository.js";
import db from "../singletons/db.singelton.js";

export default class UserService {
  constructor() {
    this.userRepository = new UsersRepository(db);
  }

  findUserByEmail(email) {
    return this.userRepository.findOne({ email });
  }
}
