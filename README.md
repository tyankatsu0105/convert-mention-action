# Message to Slack from GitHub

Convert GitHub's mention to slack's.

![demo](https://raw.githubusercontent.com/tyankatsu0105/github-mention-to-slack/master/assets/demo.png)

## Concept

```yml
name: Convert GitHub's mention to Slack's

on: push

jobs:
  message:
    runs-on: ubuntu-latest

    steps:

      - name: Convert mention
        uses: tyankatsu0105/convert-mention-action@v1
        env: 
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

        with: 
          users: '[{"tyankatsu0105": "tyankatsu", "ponday_dev": "ponday"}]'
          # ["githubName": "slackName"]
```