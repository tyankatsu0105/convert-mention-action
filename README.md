# Convert mention action

<p align="center"><img width="143px" height="130px" src="https://raw.githubusercontent.com/tyankatsu0105/convert-mention-action/master/assets/logo.png" alt="Convert GitHub's mention to slack's."></p>

<h2 align="center">Convert mention action</h2>
<p align="center">
  Convert GitHub's mention to Slack's.
</p>
<p align="center">
  <a title="MIT License" href="[LICENSE](https://opensource.org/licenses/MIT)" rel="nofollow">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
  <br>
  <br>
</p>

![demo](https://raw.githubusercontent.com/tyankatsu0105/convert-mention-action/master/assets/demo.png)

## Supports

### Issue

- created
- closed
- comment
  - created
  - edited

### Pull request

- created
- closed
- comment
  - created
  - edited
- review requested
- review changed
  - comment
  - approve
  - dissmiss
- code comments

## Usage

Create `.github/convert-mention.json`.

```json
{
  "githubName": "slackName"
}
```

Example:
```json
{
  "tyankatsu0105": "katsuya yamamoto",
  "yykaoruko": "kaoruko yamamoto"
}
```

>This actions reads config file in `.github/convert-mention.json` automatically.

```yml
name: Convert GitHub's mention to Slack's

on:
  issue_comment:
    types: [created, edited]
  pull_request_review_comment:
    types: [created, edited]
  pull_request_review:
    types: [submitted, edited, dismissed]
  issues:
    types: [opened, closed]
  pull_request:
    types: [review_requested, opened, closed]

jobs:
  message:
    runs-on: ubuntu-latest

    steps:
      - name: Convert mention
        uses: tyankatsu0105/convert-mention-action@v1.1.1
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}
```