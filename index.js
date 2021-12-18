/*
 * @Descripttion: 
 * @version: 
 * @Author: 松岛川树
 * @Date: 2021-12-18 20:47:46
 * @LastEditors: 松岛川树
 * @LastEditTime: 2021-12-18 22:30:22
 * @FilePath: \org-invite-bot\index.js
 */

require('dotenv').config()
const { Octokit } = require('@octokit/core')

const {
    GH_TOKEN: githubToken,
    GITHUB_ORG_NAME: githubOrgName,
} = process.env

const octokit = new Octokit({
    auth: githubToken,
});

(
    async () => {
        //Get an application organization problem
        let { data } = await octokit.request('GET /orgs/{org}/issues?filter=all', {
            org: githubOrgName,
        })
        // Filter out the problem tag for the INVITE Me To the Organization problem
        let inviteIssues = data.filter(item => item.labels.some(label => label.name === 'invite me to the organisation'))
        // send invitation
        for (let issue of inviteIssues) {
            const { data: { id } } = await octokit.request(`/users/${issue.user.login}`);
            const { status } = await octokit.request('POST /orgs/{org}/invitations', {
                org: githubOrgName,
                invitee_id: id
            });

            switch (status) {
                case 201:
                    console.info(`Invitation success！${issue.user.login}`)
                    break;
                case 422:
                    console.error(`Failed！${issue.user.login}`)
                    break;
                case 404:
                    console.error(`404 Not Found`)
                    break;
                default:
                    console.error(`Failed！${issue.user.login}`)
                    break;
            }
        }

    }
)()