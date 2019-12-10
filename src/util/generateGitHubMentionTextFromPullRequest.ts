/* eslint @typescript-eslint/camelcase: 0 */
import * as github from '@actions/github';

export const generateGitHubMentionTextFromPullRequest = (
  pull_request: typeof github.context.payload.pull_request
) => {
  const mentions: string[] = [];

  if (pull_request?.requested_reviewers) {
    pull_request?.requested_reviewers.forEach((reviewer) => {
      mentions.push(`@${reviewer.login}`);
    });
  }
  if (pull_request?.requested_reviewer) {
    mentions.push(`@${pull_request?.requested_reviewer.login}`);
  }

  return mentions.join(' ');
};
