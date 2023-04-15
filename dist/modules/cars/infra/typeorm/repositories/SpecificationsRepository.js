"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;
var _dataSource = _interopRequireDefault(require("@shared/infra/typeorm/data-source"));
var _Specification = require("../entities/Specification");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.default.getRepository(_Specification.Specification);
  }
  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
    return specification;
  }
  async findByName(name) {
    const specification = await this.repository.findOneBy({
      name
    });
    return specification;
  }
  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}
exports.SpecificationsRepository = SpecificationsRepository;
;