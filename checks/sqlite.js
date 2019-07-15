const assert = require("assert");

exports.check = async () => {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database(":memory:");
  const sql = (query, values) =>
    new Promise((resolve, reject) => {
      db.all(query, values, (err, results) =>
        err ? reject(err) : resolve(results)
      );
    });
  await sql(
    `create table drinks (
      id integer primary key autoincrement,
      name text
    );`
  );
  await sql("insert into drinks (name) values (?)", ["Tea"]);
  await sql(
    `create table people (
      id integer primary key autoincrement,
      name text,
      drink_id integer not null references drinks
    );`
  );
  await sql("insert into people (name, drink_id) values (?, ?);", [
    "Benjie",
    "1"
  ]);
  const rows = await sql("select * from people");
  assert.equal(rows.length, 1, "Expected one row");
  assert.equal(rows[0].drink_id, 1, "Expected drink to match");
  assert.equal(rows[0].name, "Benjie", "Expected name to match");
};
