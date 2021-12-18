# org-invite-bot
 🤖 The action used to check the problem and invite members to the organization 

![language-javascript](https://img.shields.io/github/languages/top/songdaochuanshu/org-invite-bot?logo=javascript&logoColor=yellow)
![LICENSE MIT](https://img.shields.io/github/license/songdaochuanshu/org-invite-bot?logo=apache&logoColor=blue)

A Github operation, used to trigger an event by opening an organization invitation question, and automatically send an organization invitation to the questioner

Welcome contributors to improve this project together!

## Usage

Create a workflow file such as `.github/workflows/invitation.yml` (you can find it in this repo)

```yml
name: invitation
on:
  issues:
    types: [opened]

jobs:
  welcome:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: ⬇️ npm install
        uses: actions/npm-install@v1
      - name: 🚀 send invitation
        run: node index.js
        env:
          GITHUB_ORG_NAME: ${secrets.GITHUB_ORG_NAME}
          GH_TOKEN: ${{ secrets.secrets }}
      - name: 💌 send thank you
        uses: actions/github/create-issue@v1
        with:
          title: Thank you for your contribution
          body: Thank you for your contribution.
      - name: 🔒 close issue
        uses: actions/close-pr@v1

```

### Parameters

| Parameter| Description| Required | Default |
| -------- | -------- | -------- | -------- |
| GITHUB_ORG_NAME| Organizational name | yes| You can just pass ${{secrets.GITHUB_ORG_NAME}}|
| GH_TOKEN| Github Access Token | yes| You can just pass ${{secrets.GITHUB_TOKEN}}|

## Maintainer

[@songdaochuanshu](https://github.com/songdaochuanshu)

## How to contribute

You should follow our [Code of Conduct](/CODE_OF_CONDUCT.md).
## License

[MIT](/LICENSE) © songdaochuanshu
