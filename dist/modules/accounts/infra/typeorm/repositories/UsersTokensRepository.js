"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;
var _UserTokens = require("../entities/UserTokens");
var _dataSource = _interopRequireDefault(require("@shared/infra/typeorm/data-source"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.default.getRepository(_UserTokens.UserTokens);
  }
  async create({
    refresh_token,
    user_id,
    expires_date
  }) {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_date
    });
    await this.repository.save(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    return await this.repository.findOneBy({
      user_id,
      refresh_token
    });
  }
  async deleteById(id) {
    await this.repository.delete(id);
  }
  async findByRefreshToken(refresh_token) {
    return await this.repository.findOneBy({
      refresh_token
    });
  }
}
exports.UsersTokensRepository = UsersTokensRepository;
;