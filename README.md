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
        uses: tyankatsu0105/convert-mention-action@v1.1.0
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

        with:
          users: '[{"user1_github": "user1_slack", "user2___GitHub": "user2_Slack"}]'
          # ["githubName": "slackName"]
```

If you can set file `convert-mention.json` on root, this action reads that file👍
In this case, you don't need `with: usrs:` in action file.

```json
{
  "users": {
    "tyankatsu0105": "katsuya yamamoto",
    "yykaoruko": "kaoruko yamamoto"
  }
}
```

```yml
jobs:
  message:
    runs-on: ubuntu-latest

    steps:
      - name: Convert mention
        uses: tyankatsu0105/convert-mention-action@v1.1.0
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}
```