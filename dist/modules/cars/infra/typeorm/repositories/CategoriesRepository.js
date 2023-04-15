"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;
var _dataSource = _interopRequireDefault(require("@shared/infra/typeorm/data-source"));
var _Category = require("../entities/Category");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.default.getRepository(_Category.Category);
  }
  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
  }
  async list() {
    const categories = await this.repository.find();
    return categories;
  }
  async findByName(name) {
    //Select * from categories where name = "name" limit 1
    const category = await this.repository.findOneBy({
      name
    });
    return category;
  }
}
exports.CategoriesRepository = CategoriesRepository;
;