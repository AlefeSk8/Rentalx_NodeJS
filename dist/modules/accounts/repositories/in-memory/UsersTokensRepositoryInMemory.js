"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;
var _UserTokens = require("@modules/accounts/infra/typeorm/entities/UserTokens");
class UsersTokensRepositoryInMemory {
  constructor() {
    this.userTokens = [];
  }
  async create({
    refresh_token,
    user_id,
    expires_date
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      refresh_token,
      user_id,
      expires_date
    });
    this.userTokens.push(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.userTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
    return userToken;
  }
  async deleteById(id) {
    const userToken = this.userTokens.find(userToken => userToken.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token) {
    const userToken = this.userTokens.find(userToken => userToken.refresh_token === refresh_token);
    return userToken;
  }
}
exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;
;