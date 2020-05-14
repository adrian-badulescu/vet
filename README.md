# vet-manager-front
Frontend Vet Manager

---

## run develop server

```
npm start

yarn start
```

## build for production
```
npm run build-prod
```

---
# GIT BASIC Workflow 

### (this DRAFT FLOW uses only master branch)

> we will probably use _master_ and _dev_ branches, so the following commands will use `dev` instead of `master`


- you might use a visual GIT client (use the commands as a guideline)



---
### Check GIT status (ANYTIME)

`git status`

```
On branch master
Your branch is up-to-date with 'origin/master'.
```

---
### Get new data (OFTEN - no risk for your local copy)

`git fetch origin`

- this will only get new data from remote (doesn't merge changes on existing files)


---
### Get new data and merge remote changes into your local files (BEFORE FEATURE DEVELOP)

`git pull origin master`

- you should not have any uncommitted local changes before you pull

- if you have some local changes in your working copy that you can't commit, and you need to start working on other feature, use stash feature

- using stash you'll have a clean working copy before pull

`git stash`

```
Saved working directory...
```

`git status`

```
# On branch master
nothing to commit (working directory clean)
```

- list stashes with `git stash list`


---
### Working Locally - edit, stage, commit (AS OFTEN AS NEEDED FOR LOCAL DEVELOPMENT)

> multiple commit if needed (don't mix different features into the same commit)


- stage files locally

`git add *`

- commit with descriptive message

`git commit -m "developer message"`


---
### Push to central repo (AFTER FEATURE DEVELOP)

`git push origin master`

 
---

# GIT - Develop new feature with Branching


### 1. Create a new feature branch

`git checkout -b order_edit_form`

> Now see `Working Locally` (up)


### 2. Push branch to `origin` (optional)

`git push origin order_edit_form`

> If your feature needs to be tested by other team member or if other member will work on the same branch, you need to push it to remote

> You can skip 2. and merge it to local `master` directly and then push `master` to origin

> Take care to have the latest changes on `master` before merging (`git status`)


### 3. Merge branch into active branch (`master`)

- switch to `master` 

`git checkout master`

- merge branch `order_edit_form` into `master` (with preview diff)

`git diff order_edit_form master`

`git merge order_edit_form`


> if conflicts appears you will have to edit the files manually to resolve them and then mark them as merged

- resolve merged conflicts

`git add filename`

### 5. Push `master` to central repo

`git push origin master`

or simply `git push`

### 6. Delete branch (locally and remote)

`git branch -d order_edit_form`

- if you didn't skip step 2. then you might need to delete remote branch feature:

`git push origin --delete order_edit_form`

---

# GIT - Misc

### drop all your local changes and commits (!!!)

`git fetch origin`

`git reset --hard origin/master`

