# Message to Slack from GitHub

Convert GitHub's mention to slack's.

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
        uses: tyankatsu0105/convert-mention-action@v1.0.0
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

        with:
          users: '[{"user1_github": "user1_slack", "user2___GitHub": "user2_Slack"}]'
          # ["githubName": "slackName"]
```
