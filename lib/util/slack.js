"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
const core = __importStar(require("@actions/core"));
const webhook_1 = require("@slack/webhook");
class Slack extends webhook_1.IncomingWebhook {
    constructor(url, username = 'GitHub Actions') {
        super(url, { username });
    }
    get blocks() {
        const { context } = github;
        const { sha, eventName, workflow, ref } = context;
        const { owner, repo } = context.repo;
        const repo_url = `https://github.com/${owner}/${repo}`;
        const action_url = `${repo_url}/commit/${sha}/checks`;
        const blocks = {
            type: 'section',
            fields: [
                { type: 'mrkdwn', text: `*repository*\n<${repo_url}|${owner}/${repo}>` },
                { type: 'mrkdwn', text: `*ref*\n${ref}` },
                { type: 'mrkdwn', text: `*event name*\n${eventName}` },
                { type: 'mrkdwn', text: `*workflow*\n<${action_url}|${workflow}>` },
            ]
        };
        return blocks;
    }
    generatePayload(text) {
        const text_for_slack = { type: 'mrkdwn', text };
        const blocks = Object.assign(Object.assign({}, this.blocks), { text: text_for_slack });
        const attachments = {
            blocks: [blocks]
        };
        const payload = {
            attachments: [attachments]
        };
        core.debug(`Generated payload for slack: ${JSON.stringify(payload)}`);
        return payload;
    }
    /**
     * Notify information about github actions to Slack
     */
    notify(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload(text);
                const result = yield this.send(payload);
                core.debug('Sent message to Slack');
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Slack = Slack;
