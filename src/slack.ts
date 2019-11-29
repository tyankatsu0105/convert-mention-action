// import * as github from '@actions/github';
import * as core from '@actions/core';
import { SectionBlock, MessageAttachment, MrkdwnElement } from '@slack/types';
import {
  IncomingWebhook,
  IncomingWebhookSendArguments,
  IncomingWebhookResult
} from '@slack/webhook';

export class Slack extends IncomingWebhook {
  constructor(url: string, username = 'GitHub Actions') {
    super(url, { username });
  }

  /**
   * blocks生成
   * @see https://api.slack.com/tools/block-kit-builder
   */
  protected get blocks(): SectionBlock {
    const blocks: SectionBlock = {
      type: 'section'
    };

    return blocks;
  }

  protected generatePayload(text: string): IncomingWebhookSendArguments {
    const textInBlock: MrkdwnElement = { type: 'mrkdwn', text };
    const blocks: SectionBlock = { ...this.blocks, text: textInBlock };
    const payload: IncomingWebhookSendArguments = {
      blocks: [blocks]
    };

    core.debug(`Generated payload for slack: ${JSON.stringify(payload)}`);

    return payload;
  }

  /**
   * Notify information about github actions to Slack
   */
  public async notify(text: string): Promise<IncomingWebhookResult> {
    const payload: IncomingWebhookSendArguments = this.generatePayload(text);
    const result = await this.send(payload);

    core.debug('Sent message to Slack');

    return result;
  }
}
