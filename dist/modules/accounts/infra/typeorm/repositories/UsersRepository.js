"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;
var _dataSource = _interopRequireDefault(require("@shared/infra/typeorm/data-source"));
var _User = require("../entities/User");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.default.getRepository(_User.User);
  }
  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar
  }) {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar
    });
    await this.repository.save(user);
  }
  async findByEmail(email) {
    const user = await this.repository.findOneBy({
      email
    });
    return user;
  }
  async findById(id) {
    const user = await this.repository.findOneBy({
      id
    });
    return user;
  }
}
exports.UsersRepository = UsersRepository;
;