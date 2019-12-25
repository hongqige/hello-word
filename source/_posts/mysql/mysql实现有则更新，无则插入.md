---
layout: article
title: '[mysql实现有则更新，无则插入]'
date: 2019-12-25 20:54:39
tags: mysql
---

##### 第一步
要先建立索引，索引需要是单一不重复的

可以选择一列作为索引，也可以选择几列，选择uniqe,选择brake
##### 第二部
单记录操作
```
insert into xxx (id,pid,num)
values
('1','2','3')
on deplicate key
update pid='3',num='4'
```
假设以id为索引，表中有id为1的话，是会改变pid=3,num=4,如果没有的话，那就是插入1,2,3
##### 多条记录更新
```
insert into xxx(id,pid,num)
values
(1,2,4),
(2,5,6)
on deplicate key
update pid=values(pid),num=values(num)
```
最大的不同就是最后的更新，他写的是列名，不再是具体值，他的更新值是根据你前面没有时的插入值作为结果更新
