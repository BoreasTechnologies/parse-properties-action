const core = require('@actions/core');
const props = require('properties-file');
const fs = require('fs/promises');

try {
  const file = core.getInput('file');
  fs.readFile(file, 'utf-8').then(contents => {
    const props = props.parse(contents);
    Object.entries(props).forEach(([key, val]) => {
      core.setOutput(key, val);
    });
  }).catch(err => {
    core.setFailed(err.message);
  });
} catch (error) {
  core.setFailed(error.message);
}
