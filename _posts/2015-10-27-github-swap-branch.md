---
layout: post
title: Chuyển branch Github
---

Hôm nay code 1 cái github page. Đáng nhẽ ra phải làm việc trên branch _gh-pages_, tuy nhiên lại quên tạo branch thế nên cứ làm việc trên branch master cho đến lúc định push. Dưới đây là cách tạo và chuyển hoàn toàn sang một branch mới:

```shell
# Tạo mới và chuyển sang branch gh-pages
git checkout -b gh-pages master 
# Push branch gh-pages lên và track nó
git push -u origin gh-pages     
# Xóa branch master trên local
git branch -d master            
# Xóa branch master trên remote
git push --delete origin master 
# Xóa track branch master trên remote
git remote prune origin         
```