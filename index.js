const core = require('@actions/core');

try {
  const inputName = core.getInput('name');
  const inputPath = core.getInput('path');

  console.log(inputName, inputPath);
} catch (error) {
  core.setFailed(error.message);
}
