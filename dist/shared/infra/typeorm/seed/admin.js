"use strict";

var _uuid = require("uuid");
var _bcryptjs = require("bcryptjs");
var _dataSource = require("../data-source");
async function create() {
  const connection = await (0, _dataSource.createConnection)("localhost");
  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)("admin", 8);
  connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
            values('${id}', 'admin', 'admin@rentx.com', '12345678910', '${password}', true, 'now()')
        `);
  connection.destroy;
}
;
create().then(() => console.log("User admin created!"));