/**
 * 配列文字列をparseして返す
 * @param users
 * @example
 * parsedUsers('[{"user1_github": "user1_slack"},{"user2_github": "user2_slack"},{"user3_github": "user3_slack"}]')
 * // {
 * //  user1_github: "user1_slack",
 * //  user2_github: "user2_slack",
 * //  user3_github: "user3_slack"
 * // }
 */

export interface ParsedUsers {
  [key: string]: string;
}
export const parsedUsers = (users: string): ParsedUsers =>
  (users = JSON.parse(users).reduce((obj, user) => {
    Object.keys(user).forEach((key) => (obj[key] = user[key]));
    return obj;
  }, {}));
