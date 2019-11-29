"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 引数の文字列からメンション文字列を抜き出す
 * @param text
 * @example
 * getGitHubMensionsByArgs(`@user1_github さん @user2_github \n確認お願いします。`);
 * // => [ 'user1_github', 'user2_github' ]
 */
const getGitHubMensionsByArgs = (text) => text
    .split(' ')
    .filter((item) => item.startsWith('@'))
    .map((item) => item.slice(1));
/**
 * 該当するslackのメンションを取得する
 * @param GitHubMensions
 * @param users
 */
const getMatchedSlackMensions = (GitHubMensions, users) => GitHubMensions.map((GitHubMension) => users[GitHubMension]);
/**
 * 特定のメンバー情報を取得
 * @param members
 * @param users
 * @param text
 */
exports.getMatchedMembers = (members, users, text) => members.filter((member) => getMatchedSlackMensions(getGitHubMensionsByArgs(text), users).includes(member['real_name']));
// /**
//  * メンバーのリストから特定のメンバー情報を取得
//  * @param members
//  * @param slackMensions
//  */
// export const getMatchedMembers = (members: Member, slackMensions: string[]) => members.filter((member) => slackMensions.includes(member['real_name']));
