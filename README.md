# Custom GitHub PR actions for AI automation

This project is generated with [typescript-action 🚀](https://github.com/actions/typescript-action) template.

## Initial Setup

After you've cloned the repository to your local machine or codespace, you'll
need to perform some initial setup steps before you can develop your action.

1. 🛠️ Install [nodenv](https://github.com/nodenv/nodenv) and use the proper node version (v20.x or later)

   ```bash
   brew install nodenv

   nodenv init
   
   # follow the instruction after running
   # add eval "$(nodenv init - bash)" to .bash_profile
   # or add eval "$(nodenv init - zsh)" to .zshrc
   
   curl -fsSL https://github.com/nodenv/nodenv-installer/raw/main/bin/nodenv-doctor | bash

   # install the node version in .node-version file
   nodenv install

   # use the the node version in .node-version file
   nodenv shell
   ```

1. 🛠️ Install the dependencies

   ```bash
   npm install
   ```

1. 🏗️  Package the TypeScript for distribution

   ```bash
   npm run bundle
   ```

1. ✅ Run the tests (optional - in case we have any UT)

   ```bash
   $ npm test

   PASS  ./main.test.js
   ...
   ```

## Update the Action Metadata

The [`action.yml`](action.yml) file defines metadata about your action, such as
input(s) and output(s). For details about this file, see
[Metadata syntax for GitHub Actions](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions).

## Update the Action Code

The [`src/`](./src/) directory is the heart of your action! This contains the source code that will be run when your action is invoked.

## Validate the Action

You can now validate the action by referencing it in a workflow file. For
example, [`ci.yml`](./.github/workflows/ci.yml) demonstrates how to reference an
action in the same repository.

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: PR Comment Action
    id: test-action
    uses: ./
    with:
      issue-number: ${{ github.event.pull_request.number }}
      body: This comment is from `PR Comment Action` for testing purposes.

  - name: Print Output
    id: output
    run: echo "${{ steps.test-action.outputs.comment-id }}"
```

For example workflow runs, check out the
[Actions tab](https://github.com/jimmy-ens/pr-action/actions)! 🚀

## Usage

After testing, you can create version tag(s) that developers can use to
reference different stable versions of your action. For more information, see
[Versioning](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
in the GitHub Actions toolkit.

To include the action in a workflow in another repository (the action consumer), you can use the
`uses` syntax with the `@` symbol to reference a specific branch, tag, or commit
hash.

Please copy pr-comment.yml.example to your another repository for testing (rename it to pr-comment.yml).

> [!NOTE]
> You'll need to replace 'jimmy-ens/pr-action@v1' with your {userName}/{repoName}/{version} if you publish the GitHub action to a different repository.

## Publishing a New Release

Please refer to [Publishing a New Release](https://github.com/actions/typescript-action?tab=readme-ov-file#publishing-a-new-release) for the detailed steps.

### Some useful [git tags](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) commends

- create a new *annotated* tag v1: `git tag -a v1 -m "Create v1 tag"`
- *force* to update an existing tag: `git tag -fa v1 -m "Update v1 tag"`
- <span style="color: yellow;">remember</span> to push the tag after created or updated: `git push origin v1 --force`
- list all tags: `git tag`
- *checkout* tag: `git checkout v1`
- *delete* tag: `git tag -d v1`

## Trouble shooting

### Compare Directories: `No newline at end of file`
  - Run the build locally.
  - Commit any changes in dist forlder.
  - Push to your branch.
  
  ```bash
  npm ci
  npm run bundle
  git add dist/
  git commit -m "chore: update dist with correct newlines"
  git push
  ```
    
### Check Licenses: `Licensed found errors during source enumeration`

- fix on GitHub UI:
  1. Go to the "Actions" tab in your GitHub repository.
  1. Select the "Licensed" workflow.
  1. Click "Run workflow" (top right).
  1. Wait for the workflow to complete and push changes.

- fix this locally:
  1. Run `npx licensed cache` in your project directory.
  1. Commit and push the updated files in .licenses.
