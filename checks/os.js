const os = require("os");

const SUPPORTED_OS = ["darwin", "linux"];

exports.check = () => {
  if (SUPPORTED_OS.includes(os.platform())) {
    return `${os.platform()} is supported`;
  } else {
    return `⚠️ Please let the course instructor know you are using '${os.platform()}' as we may need to check the programming exercises; alternatively, please use macOS or GNU/Linux`;
  }
};
