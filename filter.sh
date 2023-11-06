#!/bin/bash

# List all branches in your repository
branches=$(git for-each-ref --format="%(refname:short)" refs/heads/)

# Loop through each branch
for branch in $branches; do
  # Check out the branch
  git checkout $branch
  git push --force origin $branch
  # Run git filter-branch for the branch
  # git filter-branch -f --tree-filter 'rm -rf ezKey/node_modules' --prune-empty HEAD

  # Check out the original branch again
  git checkout $branch
done
