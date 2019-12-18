$branchList =  start-process git 'branches'
# git push --set-upstream origin dev-jedi
# echo ${branchList}
git add .
git commit -m "test"
git push