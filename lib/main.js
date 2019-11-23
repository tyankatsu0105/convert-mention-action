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
// import * as github from '@actions/github';
const core = __importStar(require("@actions/core"));
// import { Status } from './utils';
// import { SectionBlock, MessageAttachment, MrkdwnElement } from '@slack/types';
const webhook_1 = require("@slack/webhook");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = core.getInput('SLACK_WEBHOOK_URL');
            const webhook = new webhook_1.IncomingWebhook(url);
            yield webhook.send({
                text: 'message from action'
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
// import * as core from '@actions/core';
// async function run() {
//   try {
//     const path = core.getInput('path');
//     core.debug(`Load package.json at ${path}`);
//     const result = getPackageVersion(path);
//     core.debug(`set output: version: ${result}`);
//     core.setOutput('version', result);
//   } catch (error) {
//     core.setFailed(error.message);
//   }
// }
// run();
