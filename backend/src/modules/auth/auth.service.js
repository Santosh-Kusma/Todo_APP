import bcrypt from "bcrypt";

import { AuthRepository } from "./auth.repository.js";
const authRepository = new AuthRepository();

export class AuthService {
  async addUser(user) {
    user.password = await bcrypt.hash(String(user.password), 12);
    return await authRepository.create(user);
  }

  async verifyUser(email, password) {
    const user = await authRepository.findByUserEmail(email);
    if (!user) return false;
    const result = await bcrypt.compare(String(password), user.password);
    if (result) {
      return user;
    } else {
      return false;
    }
  }
}
