// Tư duy xây dựng model
/*
  - 1 model tương ứng với 1 table
  - 1 controller có thể có nhiều model
*/
const sql = require("../utils/db");
module.exports = {
  all: (keyword, status) => {
    // const filter = keyword
    //   ? sql`WHERE LOWER(name) LIKE ${"%" + keyword + "%"}`
    //   : sql``;
    let filter = sql`WHERE name IS NOT NULL`;
    if (status === "active" || status === "inactive") {
      filter = sql`${filter} AND status = ${
        status === "active" ? true : false
      }`;
    }
    if (keyword) {
      filter = sql`${filter} AND LOWER(name) LIKE ${"%" + keyword + "%"}`;
    }
    return sql`SELECT * FROM courses ${filter} ORDER BY id DESC`;
  },
  courseUnique: async (name) => {
    const result = await sql`SELECT id FROM courses WHERE name=${name.trim()}`;
    if (result.length) {
      return false;
    }
    return true;
  },
  courseUniqueUpdate: async (name, id) => {
    const result =
      await sql`SELECT id FROM courses WHERE name=${name.trim()} AND id !=${id}`;
    if (result.length) {
      return false;
    }
    return true;
  },
  get: (id) => {
    return sql`SELECT "id", "name", "desc", "price", "status" from courses WHERE id = ${id}`;
  },
  create: (name, price, desc, status) => {
    return sql`INSERT INTO courses("name","price","desc","status") VALUES(
      ${name}, ${price},${desc}, ${status === "active" ? true : false}
    )`;
  },
  update: (data, id) => {
    return sql`UPDATE courses SET "name" = ${data.name},
     "price"=${data.price}, "desc"=${data.desc}, "status"=${
      data.status === "active" ? true : false
    }
     WHERE id = ${id}`;
  },
  destroy: (id) => {
    return sql`DELETE from courses WHERE id = ${id}`;
  },
};
