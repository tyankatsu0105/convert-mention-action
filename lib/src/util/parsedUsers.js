"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedUsers = (users) => (users = JSON.parse(users).reduce((obj, user) => {
    Object.keys(user).forEach((key) => (obj[key] = user[key]));
    return obj;
}, {}));
