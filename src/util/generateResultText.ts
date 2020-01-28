/* eslint @typescript-eslint/camelcase: 0 */

import * as github from '@actions/github';
import {
  getMatchedMembers,
  getMembers,
  generateSlackMention,
  generateGitHubMentionTextFromPullRequest
} from './';

import { Users } from '~types/Users';

export const generateResultText = async (
  users: Users,
  token: string,
  context: typeof github.context
) => {
  const { payload, eventName } = context;
  const { action, review, comment, pull_request, issue } = payload;

  const { owner, repo } = context.repo;
  const repoName = `[${owner}/${repo}]`;

  /**
   * mentionが含まれたtext
   * forEachでundefinedにならないように初期値空文字列入れる
   */
  let includeMentionText = '';

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
      // PR コメント
      includeMentionText = comment.body;
      emoji = ':speech_balloon:';
      explain = 'Comments';
      link = `<${comment.html_url}|${issue?.title}>`;

      break;
    case 'pull_request_review_comment':
      // PR コードコメント
      includeMentionText = comment.body;
      emoji = ':speech_balloon:';
      explain = 'PR comments';
      link = `<${comment.html_url}|${pull_request?.title}>`;

      break;
    case 'pull_request_review':
      if (review.state === 'approved') {
        // PR approved
        pull_request?.assignees.forEach((assignee) => {
          includeMentionText += `@${assignee.login} `;
        });
        emoji = ':white_check_mark:';
        explain = 'Approve';
      } else if (review.state === 'commented') {
        // PR comment
        includeMentionText = review.body;
        emoji = ':speech_balloon:';
        explain = 'PR comments';
      } else if (review.state === 'dismissed') {
        // PR comment
        includeMentionText = review.body;
        emoji = ':negative_squared_cross_mark:';
        explain = 'PR dismissed';
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
        includeMentionText = generateGitHubMentionTextFromPullRequest(
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
    includeMentionText
  );
  const ids = members.map((member) => member.id);

  const resultText = `${repoName} ${generateSlackMention(ids)}
  ${emoji} ${explain} ${link}`;
  return resultText;
};
