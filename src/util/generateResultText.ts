/* eslint @typescript-eslint/camelcase: 0 */

import * as github from '@actions/github';
import {
  ParsedUsers,
  getMatchedMembers,
  getMembers,
  generateSlackMension,
  generateGitHubMentionTextFromPullRequest
} from './';

export const generateResultText = async (
  users: ParsedUsers,
  token: string,
  context: typeof github.context
) => {
  const { payload, eventName } = context;
  const { action, review, comment, pull_request, issue } = payload;

  const { owner, repo } = context.repo;
  const repoName = `[${owner}/${repo}]`;

  /**
   * mensionが含まれたtext
   * forEachでundefinedにならないように初期値空文字列入れる
   */
  let includeMensionText = '';

  let emoji;
  let explain;

  /**
   * リンク
   */
  let link;

  // @see https://developer.github.com/v3/activity/events/types/

  switch (eventName) {
    case 'issue_comment':
      // issue コメント
      includeMensionText = comment.body;
      emoji = ':speech_balloon:';
      explain = 'Issue comments';
      link = `<${comment.html_url}|${issue?.title}>`;

      break;
    case 'pull_request_review_comment':
      // PR コードコメント
      includeMensionText = comment.body;
      emoji = ':speech_balloon:';
      explain = 'PR comments';
      link = `<${comment.html_url}|${pull_request?.title}>`;

      break;
    case 'pull_request_review':
      if (review.state === 'approved') {
        // PR approved
        pull_request?.assignees.forEach((assignee) => {
          includeMensionText += `@${assignee.login} `;
        });
        emoji = ':white_check_mark:';
        explain = 'Approve';
      } else if (review.state === 'commented') {
        // PR comment
        includeMensionText = review.body;
        emoji = ':speech_balloon:';
        explain = 'PR comments';
      }

      link = `<${review.html_url}|${pull_request?.title}>`;

      break;
    case 'issues':
      if (action === 'opened') {
        // issue open
        emoji = ':open_book:';
        explain = 'Issue open';
      } else if (action === 'closed') {
        // issue close
        emoji = ':closed_book:';
        explain = 'Issue close';
      }

      link = `<${issue?.html_url}|${issue?.title}>`;

      break;
    case 'pull_request':
      if (action === 'opened') {
        // PR open
        emoji = ':open_book:';
        explain = 'PR open';
      } else if (action === 'closed') {
        // PR close
        emoji = ':closed_book:';
        explain = 'PR close';
      } else if (action === 'review_requested') {
        // PR レビュー申請
        includeMensionText = generateGitHubMentionTextFromPullRequest(
          pull_request
        );
        emoji = ':bell:';
        explain = 'Review request';
      }

      link = `<${pull_request?.html_url}|${pull_request?.title}>`;

      break;
    default:
      break;
  }

  const members = getMatchedMembers(
    await getMembers(token),
    users,
    includeMensionText
  );
  const ids = members.map((member) => member.id);

  const resultText = `${repoName} ${generateSlackMension(ids)}
  ${emoji} ${explain} ${link}`;
  return resultText;
};
