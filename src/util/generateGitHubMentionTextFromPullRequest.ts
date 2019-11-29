/* eslint @typescript-eslint/camelcase: 0 */
import * as github from '@actions/github';

export const generateGitHubMentionTextFromPullRequest = (
  pull_request: typeof github.context.payload.pull_request
) => {
  let includeMensionText = '';

  if (pull_request?.requested_reviewers) {
    pull_request?.requested_reviewers.forEach((reviewer) => {
      includeMensionText += `@${reviewer.login}`;
    });
  }
  if (pull_request?.requested_reviewer) {
    includeMensionText = `@${pull_request?.requested_reviewer.login}`;
  }

  return includeMensionText;
};
