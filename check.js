const os = require("os");
const packageJson = require(`./package.json`);

function indent(str) {
  return "  " + String(str).replace(/\n/g, "\n  ");
}

function handleError(e, errorMessage) {
  console.error();
  console.error("____________________");
  console.error();
  console.error("🛑 " + errorMessage);
  console.error();
  console.error(indent(String(e.stack || e)));
  console.error();
  if (e.fix) {
    console.error("👉 Potential solution:");
    console.error();
    console.error(indent(e.fix));
  }
  console.error("____________________");
  console.error();
  console.error();
  process.exitCode = 1;
}

function handleSuccess(result, successMessage) {
  console.log("✅ " + (result || successMessage));
}

function check(moduleName, inSuccessMessage, inErrorMessage) {
  const successMessage = inSuccessMessage || moduleName + " check passed";
  const errorMessage =
    inErrorMessage || "The check for '" + moduleName + "' failed";
  return new Promise((resolve, reject) => {
    try {
      const { check: checker } = require("./checks/" + moduleName);
      const result = checker();
      if (result && typeof result.then === "function") {
        result.then(
          result => {
            handleSuccess(result, successMessage);
            resolve();
          },
          e => {
            handleError(e, errorMessage);
            resolve();
          }
        );
      } else {
        handleSuccess(result, successMessage);
        resolve();
      }
    } catch (e) {
      handleError(e, errorMessage);
      resolve();
    }
  });
}

function main() {
  console.log(
    "This is the GraphQL-Training.com compatibility checker, v" +
      packageJson.version
  );
  console.log(
    "You are running Node " + process.version + " on " + os.platform()
  );
  console.log();
  console.log("Running checks...");
  console.log();

  Promise.resolve()
    .then(() =>
      check(
        "basics",
        "basic JS language support",
        "⚠️ Your version of Node does not seem to support some of the required language features. Please use Node v10 or higher."
      )
    )
    .then(() => check("asyncAwait"))
    .then(() => check("asyncIterators"))
    .then(() => check("yarn"))
    .then(() => check("sqlite"))
    .then(() => {
      console.log();
      console.log("Checking complete");
    });
}

main();
