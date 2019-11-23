import { ParsedUsers } from './parsedUsers';
import { Member } from './getMember';

/**
 * 引数の文字列からメンション文字列を抜き出す
 * @param text
 * @example
 * getGitHubMensionsByArgs(`@user1_github さん @user2_github \n確認お願いします。`);
 * // => [ 'user1_github', 'user2_github' ]
 */
const getGitHubMensionsByArgs = (text: string) =>
  text
    .split(' ')
    .filter((item) => item.startsWith('@'))
    .map((item) => item.slice(1));

/**
 * 該当するslackのメンションを取得する
 * @param GitHubMensions
 * @param users
 */
const getMatchedSlackMensions = (
  GitHubMensions: string[],
  users: ParsedUsers
) => GitHubMensions.map((GitHubMension) => users[GitHubMension]);

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
    getMatchedSlackMensions(getGitHubMensionsByArgs(text), users).includes(
      member['real_name']
    )
  );

// /**
//  * メンバーのリストから特定のメンバー情報を取得
//  * @param members
//  * @param slackMensions
//  */
// export const getMatchedMembers = (members: Member, slackMensions: string[]) => members.filter((member) => slackMensions.includes(member['real_name']));
