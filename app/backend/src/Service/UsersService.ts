import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import UsersModel from '../Model/UsersModel';

export default class UsersService {
  private model = new UsersModel();

  async login(email: string, password: string) {
    const result = await this.model.getUserByEmail(email);
    if (!result) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const passwordCorreto = await bcrypt.compare(password, result.password);
    if (!passwordCorreto) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const payload = { id: result.id, role: result.role };
    const token = jwt.sign(payload, process.env.SECRET ?? 'jwt_secret', {
      expiresIn: '1d',
    });

    return { status: 200, data: { token } };
  }
}
