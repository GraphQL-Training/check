const assert = require("assert");

async function getThree() {
  return 3;
}
exports.check = async function check() {
  const result = await getThree();
  assert.equal(result, 3);
};
