"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGitHubMentionTextFromPullRequest = (pull_request) => {
    var _a, _b, _c, _d;
    const mentions = [];
    if ((_a = pull_request) === null || _a === void 0 ? void 0 : _a.requested_reviewers) {
        (_b = pull_request) === null || _b === void 0 ? void 0 : _b.requested_reviewers.forEach((reviewer) => {
            mentions.push(`@${reviewer.login}`);
        });
    }
    if ((_c = pull_request) === null || _c === void 0 ? void 0 : _c.requested_reviewer) {
        mentions.push(`@${(_d = pull_request) === null || _d === void 0 ? void 0 : _d.requested_reviewer.login}`);
    }
    return mentions.join(' ');
};
