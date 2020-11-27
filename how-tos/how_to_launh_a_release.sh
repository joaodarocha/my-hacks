
################################
# HOW TO LAUNCH A RELEASE
################################

#==== 1 =====
# Create hotfix branch and push to remote repository
git checkout -b release/RELEASE_NUMBER && git add . && git commit -m "YOUR_COMMIT_MESSAGE_HERE" && git push origin release/RELEASE_NUMBER
 
 
#==== 2 =====
# Create Pull request in BitBucket (ptversions)
#2.1 - Go to ptversions
#2.2 - Create the pull-request for branch master
#2.3 - Accept the pull-request
#2.4 - Add the tag '0.3.2' to the commit of the pull request ON BRANCH MASTER!!
 
#==== 3 =====
# Change to 'development' branch, update remote branch 'development' and delete branches and update your local 'master' branch
git checkout development && git pull origin development && git merge --no-ff release/RELEASE_NUMBER && git push origin development && git branch -d release/RELEASE_NUMBER && git remote prune origin && git checkout master && git pull origin master && git fetch --tags




# == 1 ==
git checkout -b release/0.10.0
yarn prepare_changelog
git add . && git commit -m "Bumped version to 0.10.0 in README, changelog and package.json." && git push origin release/0.10.0

#== 2 ==
# 2.1 => pull request (master) + tag
# 2.2 => pull request (development) + delete release branch  

# == 3 ==
git checkout master && git branch -D release/0.10.0 && git remote prune origin && git pull origin master && git fetch --tags