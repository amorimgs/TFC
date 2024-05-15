import SequelizeUsers from '../database/models/users.model';
import { Users } from '../types/AllTypes';

export default class UsersModel {
  private model = SequelizeUsers;

  async getUserByEmail(email: string): Promise<Users | null> {
    const result = await this.model.findOne({ where: { email } });
    if (!result) {
      return null;
    }
    return result;
  }
}
