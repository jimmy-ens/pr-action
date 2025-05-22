import * as core from '@actions/core'
import { createComment } from './create-comment.js'
import { inspect } from 'util'
import * as utils from './utils.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const commentId = await createComment()
    core.info(`Created comment id '${commentId}'.`)
  } catch (error) {
    core.debug(inspect(error))
    core.setFailed(utils.getErrorMessage(error))
  }
}
