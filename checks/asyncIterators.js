const assert = require("assert");

async function* generator() {
  for (let i = 0; i < 10; i++) {
    yield Promise.resolve(i);
  }
}
exports.check = async function() {
  let sum = 0;
  for await (const i of generator()) {
    sum += i;
  }
  assert.equal(sum, 45, "Incorrect sum");
};
