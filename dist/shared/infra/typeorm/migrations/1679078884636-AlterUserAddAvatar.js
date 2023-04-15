"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAddAvatar1679078884636 = void 0;
var _typeorm = require("typeorm");
class AlterUserAddAvatar1679078884636 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar");
  }
}
exports.AlterUserAddAvatar1679078884636 = AlterUserAddAvatar1679078884636;