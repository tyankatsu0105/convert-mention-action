"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMentionTextFromPullRequest = (pull_request) => {
    var _a, _b, _c, _d;
    let github_user_list = [];
    if ((_a = pull_request) === null || _a === void 0 ? void 0 : _a.requested_reviewers) {
        github_user_list = github_user_list.concat((_b = pull_request) === null || _b === void 0 ? void 0 : _b.requested_reviewers.map(reviewer => `@${reviewer.login}`));
    }
    if ((_c = pull_request) === null || _c === void 0 ? void 0 : _c.requested_reviewer) {
        github_user_list.push(`@${(_d = pull_request) === null || _d === void 0 ? void 0 : _d.requested_reviewer.login}`);
    }
    return github_user_list
        .filter((val, index, self) => self.indexOf(val) === index) // to unique
        .join(" ");
};
