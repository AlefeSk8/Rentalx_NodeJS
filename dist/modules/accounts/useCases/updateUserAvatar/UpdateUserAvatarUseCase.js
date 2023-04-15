"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _IStorageProvider = require("@shared/container/providers/StorageProvider/IStorageProvider");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let UpdateUserAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarUseCase {
  constructor(UsersRepository, StorageProvider) {
    this.UsersRepository = UsersRepository;
    this.StorageProvider = StorageProvider;
  }
  async execute({
    user_id,
    avatar_file
  }) {
    const user = await this.UsersRepository.findById(user_id);
    if (user.avatar) {
      await this.StorageProvider.delete(user.avatar, "avatar");
    }
    ;
    await this.StorageProvider.save(avatar_file, "avatar");
    user.avatar = avatar_file;
    await this.UsersRepository.create(user);
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;
;