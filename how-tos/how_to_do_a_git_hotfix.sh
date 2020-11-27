
################################
# HOW TO MAKE A HOTFIX
################################

#==== 1 =====
# Create hotfix branch and push to remote repository
git checkout -b hotfix/HOTFIX_NUMBER && git add . && git commit -m "YOUR_COMMIT_MESSAGE_HERE" && git push origin hotfix/HOTFIX_NUMBER
 
 
#==== 2 =====
# Create Pull request in BitBucket (ptversions)
#2.1 - Go to ptversions
#2.2 - Create the pull-request for branch master
#2.3 - Accept the pull-request
#2.4 - Add the tag '0.3.2' to the commit of the pull request ON BRANCH MASTER!!
 
#==== 3 =====
# Change to 'development' branch, update remote branch 'development' and delete branches and update your local 'master' branch
git checkout development && git pull origin development && git merge --no-ff hotfix/HOTFIX_NUMBER && git push origin development && git branch -d hotfix/HOTFIX_NUMBER && git push origin --delete hotfix/HOTFIX_NUMBER && git remote prune origin && git checkout master && git pull origin master && git pull


# == 1 ==
git checkout -b hotfix/0.11.2
git add . && git commit -m "Updated app name @ footer + Bumped versions to 0.11.2 @ README + package.json" && yarn prepare_changelog && git add . && git commit -m "Updated changelog" && git push origin hotfix/0.11.2

#== 2 ==
# 2.1 => pull request (master) + tag
# 2.2 => pull request (development) + delete release branch  

# == 3 ==
git checkout master && git branch -D hotfix/0.11.2 && git remote prune origin && git pull origin master && git fetch --tags && yarn build_staging && yarn deploy_staging && yarn build_demo && yarn deploy_demo
