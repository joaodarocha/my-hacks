### Delete fully merged branches:

```shell
git branch -r --merged | grep -v develop | grep -v master | sed "s/origin\///" | xargs -I {} echo {}
git branch -r --merged | grep -v develop | grep -v master | sed "s/origin\///" | xargs -I {} git push origin --delete {}
```

### Delete fully merged local branches:

```shell
git branch --merged | grep -v develop | grep -v master | sed "s/origin\///" | xargs -I {} echo {}
git branch --merged | grep -v develop | grep -v master | sed "s/origin\///" | xargs -I {} git branch -d {}
```
