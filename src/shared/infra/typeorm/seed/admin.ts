import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import { createConnection } from "../data-source";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    connection.query(
        `INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
            values('${id}', 'admin', 'admin@rentx.com', '12345678910', '${password}', true, 'now()')
        `
    );
    connection.destroy;
};

create().then(() => console.log("User admin created!"))