import * as github from '@actions/github';
import * as core from '@actions/core';
import {
  IncomingWebhook,
  IncomingWebhookSendArguments,
  IncomingWebhookResult
} from '@slack/webhook';
import { parsedUsers, generateResultText } from './util';
import { Slack } from './slack';

async function run() {
  try {
    const SLACK_WEBHOOK_URL: string = process.env.SLACK_WEBHOOK_URL || '';
    const SLACK_TOKEN: string = process.env.SLACK_TOKEN || '';

    const users = parsedUsers(core.getInput('users'));

    const { context } = github;
    console.log(JSON.stringify(context, null, 2));

    const slack = new Slack(SLACK_WEBHOOK_URL);

    const resultText = await generateResultText(users, SLACK_TOKEN, context);

    await slack.notify(resultText);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
