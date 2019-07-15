const { spawnSync } = require("child_process");
const os = require("os");

const platform = os.platform();

exports.check = () => {
  try {
    const yarnBinary = platform === "win32" ? "yarn.cmd" : "yarn";
    const result = spawnSync(yarnBinary, ["--version"]);
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
