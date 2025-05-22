import * as core from '@actions/core'
import { existsSync, readFileSync } from 'fs'

export type Inputs = {
  token: string
  repository: string
  issueNumber: number
  body: string
  bodyPath: string
}

export function getInputs(): Inputs {
  return {
    token: core.getInput('token'),
    repository: core.getInput('repository'),
    issueNumber: Number(core.getInput('issue-number')),
    body: core.getInput('body'),
    bodyPath: core.getInput('body-path')
  }
}

export function getBody(inputs: Inputs) {
  let body: string = inputs.body

  if (!body && inputs.bodyPath) {
    if (existsSync(inputs.bodyPath)) {
      body = readFileSync(inputs.bodyPath, 'utf-8')
    } else {
      core.warning(`File not found: ${inputs.bodyPath}`)
    }
  }

  return body
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}
