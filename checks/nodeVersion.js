exports.check = () => {
  const [major, minor, patch] = process.version
    .substr(1)
    .split(".")
    .map(n => parseInt(n, 10));
  if (major > 10 || (major === 10 && minor >= 0)) {
    return `node ${process.version} is installed`;
  } else {
    throw new Error(
      `node ${
        process.version
      } is not sufficiently up to date, v10 or higher is required`
    );
  }
};
