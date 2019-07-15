exports.check = () => {
  const assert = require("assert");
  const { a } = { a: 1 };
  assert.equal(a, 1, "A should equal 1");
};
