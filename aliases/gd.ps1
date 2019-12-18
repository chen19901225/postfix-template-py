$branchList =  start-process git 'branches'
# echo ${branchList}
git add .
git commit -m "test"
git push