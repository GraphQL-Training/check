const { spawnSync } = require("child_process");

exports.check = () => {
  try {
    const result = spawnSync("yarn", ["--version"]);
    if (result.error) {
      throw result.error;
    }
    const version = result.stdout.toString("utf8").trim();
    const [major, minor, patch] = version.split(".").map(n => parseInt(n, 10));
    if (major > 1 || (major === 1 && minor >= 15)) {
      return `yarn v${version} is installed`;
    } else {
      throw new Error(
        `yarn v${version} is not sufficiently up to date, v1.15 or higher is required`
      );
    }
  } catch (e) {
    e.fix = `Please run 'npm install -g yarn'`;
    throw e;
  }
};
