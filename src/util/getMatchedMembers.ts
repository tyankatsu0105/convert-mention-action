import { ParsedUsers } from './parsedUsers';
import { Member } from './getMember';

/**
 * 引数の文字列からメンション文字列を抜き出す
 * @param text
 * @example
 * getGitHubMentionsByArgs(`@user1_github さん @user2_github \n確認お願いします。`);
 * // => [ 'user1_github', 'user2_github' ]
 */
const getGitHubMentionsByArgs = (text: string) =>
  text
    .split(' ')
    .filter((item) => item.startsWith('@'))
    .map((item) => item.slice(1));

/**
 * 該当するslackのメンションを取得する
 * @param GitHubMentions
 * @param users
 */
const getMatchedSlackMentions = (
  GitHubMentions: string[],
  users: ParsedUsers
) => GitHubMentions.map((GitHubMention) => users[GitHubMention]);

/**
 * 特定のメンバー情報を取得
 * @param members
 * @param users
 * @param text
 */
export const getMatchedMembers = (
  members: Member[],
  users: ParsedUsers,
  text: string
): Member[] =>
  members.filter((member) =>
    getMatchedSlackMentions(getGitHubMentionsByArgs(text), users).includes(
      member['real_name']
    )
  );

// /**
//  * メンバーのリストから特定のメンバー情報を取得
//  * @param members
//  * @param slackMentions
//  */
// export const getMatchedMembers = (members: Member, slackMentions: string[]) => members.filter((member) => slackMentions.includes(member['real_name']));
