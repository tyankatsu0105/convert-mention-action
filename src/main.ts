import * as github from '@actions/github';
import * as core from '@actions/core';
// import { SectionBlock, MessageAttachment, MrkdwnElement } from '@slack/types';
import {
  IncomingWebhook,
  IncomingWebhookSendArguments,
  IncomingWebhookResult
} from '@slack/webhook';

async function run() {
  try {
    const url = core.getInput('SLACK_WEBHOOK_URL');
    const webhook = new IncomingWebhook(url);
    console.log(github.context);

    // await webhook.send({
    //   text: 'message from action'
    // });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

// import * as core from '@actions/core';

// async function run() {
//   try {
//     const path = core.getInput('path');

//     core.debug(`Load package.json at ${path}`);

//     const result = getPackageVersion(path);

//     core.debug(`set output: version: ${result}`);
//     core.setOutput('version', result);
//   } catch (error) {
//     core.setFailed(error.message);
//   }
// }

// run();
