import * as github from '@actions/github';
import * as core from '@actions/core';
import { parsedUsers, generateResultText } from './util';
import { Slack } from './slack';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), './convert-mention.json');

async function run() {
  try {
    // const SLACK_WEBHOOK_URL: string = process.env.SLACK_WEBHOOK_URL || '';
    // const SLACK_TOKEN: string = process.env.SLACK_TOKEN || '';

    // /*eslint-disable-next-line @typescript-eslint/no-var-requires */
    // const users = require(core.getInput('users'));

    // const { context } = github;

    // const slack = new Slack(SLACK_WEBHOOK_URL);

    // const resultText = await generateResultText(users, SLACK_TOKEN, context);

    // await slack.notify(resultText);

    /*eslint-disable-next-line @typescript-eslint/no-var-requires */
    core.debug(require(core.getInput('users')));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
