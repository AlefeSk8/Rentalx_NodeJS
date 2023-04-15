"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;
var _User = require("../../infra/typeorm/entities/User");
class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }
  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }
  async findById(id) {
    return this.users.find(user => user.id === id);
  }
  async create({
    name,
    password,
    email,
    driver_license,
    avatar
  }) {
    const user = new _User.User();
    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
      avatar
    });
    this.users.push(user);
  }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;
;