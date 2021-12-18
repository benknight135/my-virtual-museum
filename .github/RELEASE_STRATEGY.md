# Release strategy
This repository uses [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html) strategy.

## Deployment
Webapp is deployed to Heroku automically on new releases.

## Branches
This repository has two permanent branches: 'main', 'prod'.
### Main
This branch has the code that will be released on successful build (likely stable).
- No code will be directly written to this branch.
- A release is triggered when code is merged to this branch.
- On successful release, this branch is merged to 'prod'.

### Prod
This is the latest production code (stable).
- No code will be directly written to this branch.
- Merge 'main' branch is merged into this branch on successful release
- Only 'main' branch can merge into this branch.
