# Message to Slack from GitHub

## Concept

```js
// issue created
// tyankatsu0105/message-to-slack-from-github 
// 📖<https://www.リンク/|issue名>

// issue closed
// tyankatsu0105/message-to-slack-from-github 
// 📕<https://www.リンク/|issue名>

// issue comment
// tyankatsu0105/message-to-slack-from-github 
// 💬<https://www.リンク/|issueのコメントの箇所>

// issue comment mension
// tyankatsu0105/message-to-slack-from-github @yamamoto katsuya
// 💬<https://www.リンク/|issueのコメントの箇所>


// PR created => done
// tyankatsu0105/message-to-slack-from-github 
// 📖<https://www.リンク/|PR名>

// PR closed => done
// tyankatsu0105/message-to-slack-from-github 
// 📕<https://www.リンク/|PR名>

// PR comment
// tyankatsu0105/message-to-slack-from-github 
// 💬<https://www.リンク/|PRのコメントの箇所>

// PR comment mension
// tyankatsu0105/message-to-slack-from-github @yamamoto katsuya
// 💬<https://www.リンク/|PRのコメントの箇所>

// PR approve
// tyankatsu0105/message-to-slack-from-github @assignされてる人
// ✅<https://www.リンク/|PR名>

// PR dissmiss review
// tyankatsu0105/message-to-slack-from-github @assignされてる人
// 🚫<https://www.リンク/|PR名>

// PR Add Reviewers  => done
// tyankatsu0105/message-to-slack-from-github @Reviewers 追加された人
// 🙏<https://www.リンク/|PR名>

```

```yml
name: Message to Slack from GitHub

on: push

jobs:
  message:
    runs-on: ubuntu-latest

    steps:

      - name: Message
        uses: tyankatsu0105/message-to-slack-from-github@v1
        env: 
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

        with: 
          users: '[{"tyankatsu0105": "tyankatsu", "ponday_dev": "ponday"}]'
          # ["githubName": "slackName"]
```