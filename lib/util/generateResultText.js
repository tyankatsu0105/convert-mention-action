"use strict";
/* eslint @typescript-eslint/camelcase: 0 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
exports.generateResultText = (users, token, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
            link = `<${comment.html_url}|${(_a = issue) === null || _a === void 0 ? void 0 : _a.title}>`;
            break;
        case 'pull_request_review_comment':
            // PR コードコメント
            includeMentionText = comment.body;
            emoji = ':speech_balloon:';
            explain = 'PR comments';
            link = `<${comment.html_url}|${(_b = pull_request) === null || _b === void 0 ? void 0 : _b.title}>`;
            break;
        case 'pull_request_review':
            if (review.state === 'approved') {
                // PR approved
                (_c = pull_request) === null || _c === void 0 ? void 0 : _c.assignees.forEach((assignee) => {
                    includeMentionText += `@${assignee.login} `;
                });
                emoji = ':white_check_mark:';
                explain = 'Approve';
            }
            else if (review.state === 'commented') {
                // PR comment
                includeMentionText = review.body;
                emoji = ':speech_balloon:';
                explain = 'PR comments';
            }
            else if (review.state === 'dismissed') {
                // PR comment
                includeMentionText = review.body;
                emoji = ':negative_squared_cross_mark:';
                explain = 'PR dismissed';
            }
            link = `<${review.html_url}|${(_d = pull_request) === null || _d === void 0 ? void 0 : _d.title}>`;
            break;
        case 'issues':
            if (action === 'opened') {
                // issue open
                emoji = ':open_book:';
                explain = 'Issue open';
            }
            else if (action === 'closed') {
                // issue close
                emoji = ':closed_book:';
                explain = 'Issue close';
            }
            link = `<${(_e = issue) === null || _e === void 0 ? void 0 : _e.html_url}|${(_f = issue) === null || _f === void 0 ? void 0 : _f.title}>`;
            break;
        case 'pull_request':
            if (action === 'opened') {
                // PR open
                emoji = ':open_book:';
                explain = 'PR open';
            }
            else if (action === 'closed') {
                // PR close
                emoji = ':closed_book:';
                explain = 'PR close';
            }
            else if (action === 'review_requested') {
                // PR レビュー申請
                includeMentionText = _1.generateGitHubMentionTextFromPullRequest(pull_request);
                emoji = ':bell:';
                explain = 'Review request';
            }
            link = `<${(_g = pull_request) === null || _g === void 0 ? void 0 : _g.html_url}|${(_h = pull_request) === null || _h === void 0 ? void 0 : _h.title}>`;
            break;
        default:
            break;
    }
    const members = _1.getMatchedMembers(yield _1.getMembers(token), users, includeMentionText);
    const ids = members.map((member) => member.id);
    const resultText = `${repoName} ${_1.generateSlackMention(ids)}
  ${emoji} ${explain} ${link}`;
    return resultText;
});
