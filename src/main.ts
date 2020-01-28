import * as github from '@actions/github';
import * as core from '@actions/core';
import { generateResultText } from './util';
import { Slack } from './slack';
import fs from 'fs';
import path from 'path';

async function run() {
  try {
    const SLACK_WEBHOOK_URL: string = process.env.SLACK_WEBHOOK_URL || '';
    const SLACK_TOKEN: string = process.env.SLACK_TOKEN || '';

    const configPath = path.join(process.cwd(), core.getInput('users'));
    /*eslint-disable-next-line @typescript-eslint/no-var-requires */
    const users = require(configPath);

    const { context } = github;

    const slack = new Slack(SLACK_WEBHOOK_URL);

    const resultText = await generateResultText(users, SLACK_TOKEN, context);

    await slack.notify(resultText);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
