import * as core from '@actions/core'
import { createComment } from './create-comment.js'
import { wait } from './wait.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const commentId = await createComment()
    // Set outputs for other workflow steps to use
    core.setOutput('commentId', commentId)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    const ms = core.getInput('milliseconds')
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
