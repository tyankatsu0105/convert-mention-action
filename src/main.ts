import * as core from '@actions/core';
import { getPackageVersion } from './getPackageVersion';

async function run() {
  try {
    const path = core.getInput('path');

    core.debug(`Load package.json at ${path}`);

    const result = getPackageVersion(path);

    core.debug(`set output: version: ${result}`);
    core.setOutput('version', result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
