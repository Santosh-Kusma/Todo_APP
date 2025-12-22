import { User } from "./auth.model.js";

export class AuthRepository {
  async create(data) {
    const newUser = new User(data);
    return await newUser.save();
  }

  async findByUserEmail(email) {
    return await User.findOne({ email });
  }
}
