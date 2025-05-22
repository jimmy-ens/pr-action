import * as core from '@actions/core'
import * as github from '@actions/github'
import { inspect } from 'util'
import * as utils from './utils.js'

export async function createComment(): Promise<number> {
  const inputs = utils.getInputs()
  core.debug(`Inputs: ${inspect(inputs)}`)

  const [owner, repo] = inputs.repository.split('/')
  const body = utils.getBody(inputs)
  const octokit = github.getOctokit(inputs.token)

  const { data: comment } = await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: inputs.issueNumber,
    body
  })

  // Set outputs for other workflow steps to use
  core.setOutput('comment-id', comment.id)
  core.setOutput('body', comment.body)
  core.setOutput('body-text', comment.body_text)
  core.setOutput('body-html', comment.body_html)
  core.setOutput('html', comment.url)
  core.setOutput('html-url', comment.html_url)

  return comment.id
}
