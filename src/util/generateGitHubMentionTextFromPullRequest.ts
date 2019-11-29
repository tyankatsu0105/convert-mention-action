/* eslint @typescript-eslint/camelcase: 0 */
import * as github from '@actions/github';

export const generateGitHubMentionTextFromPullRequest = (
  pull_request: typeof github.context.payload.pull_request
) => {
  let includeMentionText = '';

  if (pull_request?.requested_reviewers) {
    pull_request?.requested_reviewers.forEach((reviewer) => {
      includeMentionText += `@${reviewer.login}`;
    });
  }
  if (pull_request?.requested_reviewer) {
    includeMentionText = `@${pull_request?.requested_reviewer.login}`;
  }

  return includeMentionText;
};
