---
title: '[oracle体育馆人流]'
date: 2019-12-25 21:03:23
tags: oracle
---


### 连续三天的高峰
**代码**
```
select id,date,people from 	(select id,date,people,cast(id as signed int)-@i as m from Stadium,(select @i:=0) y  where people>=100) x
where m in(
    select m from (
    select m,count(1) as n from
        (select id,date,@j:=@j+1 as n,people,cast(id as signed int)-@j as m from Stadium,(select @j:=0) y  where  people>=100 order by date) q
         group by m ) y where n>3)
```
*这是我自己写的代码，运行也有结果，但是leetcode运行是没有结果的，我也不知道什么原因，就是为空*

### 附上搜索结果
*听他们讲这个好像是最优的写法*
```
SELECT DISTINCT s1.*
FROM stadium s1, stadium s2, stadium s3
WHERE s1.people >= 100 AND s2.people >= 100 AND s3.people>=100 AND
        (
            (s2.id-1=s1.id AND s3.id-1=s2.id AND s3.id-2=s1.id) OR
            (s3.id-1=s1.id AND s1.id-1=s2.id AND s3.id-2=s2.id) OR
            (s2.id-1=s1.id AND s1.id-1=s3.id AND s2.id-2=s3.id) OR
            (S1.id-1=s2.id AND s2.id-1=s3.id AND s1.id-2=s3.id)
        )
ORDER BY id
```
*三个表代表三天，第三天不能放中间，所以只有四种排放方法*
### 另外，繁琐的迭代方法（搜索）
```
SELECT e.id, e.date, e.people
  FROM (SELECT id,
               s.date,
               @sdate1 := (CASE
                 WHEN s.people >= 100 THEN
                  @sdate1
                 ELSE
                  @sdate1 + 1
               END) AS sdate,
               s.people
          FROM stadium s, (SELECT @sdate1 := 0) b) e,

       (SELECT c.sdate
          FROM (SELECT id,
                       s.date,
                       @sdate := (CASE
                         WHEN s.people >= 100 THEN
                          @sdate
                         ELSE
                          @sdate + 1
                       END) AS sdate,
                       s.people
                  FROM stadium s, (SELECT @sdate := 0) b) c
         GROUP BY c.sdate
        HAVING COUNT(c.sdate) > 3) d
 WHERE d.sdate = e.sdate
   AND e.people >= 100
```
*这个的思路跟我的思路有点像，他这个的是在内表中，只要people的值在100上下跳动一次，那么得到的值就发生一个改变，如果都是同属100以上或者以下值就不改变，这样可以得到值不发生改变的一系列伪分类，然后在第三个表里面统计第二个表里面值不改变超过三个的，最后是最外层表加条件需要people值是100以上的*

*我自己的思路是排序然后判断偏移量分类的，跟上面思路不同就在这里*

### 最终答案
```
select distinct * from
(
select a.* from stadium a
 join stadium b on a.id=b.id+1
 join stadium c on b.id=c.id+1
where a.people >= 100 and b.people>= 100 and c.people >= 100
union
select a.* from stadium a
 join stadium b on a.id+1=b.id
 join stadium c on b.id+1=c.id
where a.people >= 100 and b.people>= 100 and c.people >= 100
union
select a.* from stadium a
 join stadium b on a.id+1=b.id
 join stadium c on b.id-2=c.id
where a.people >= 100 and b.people>= 100 and c.people >= 100
) a
order by id
```
*这个答案听说比上面那个最优写法运行的快，也不知道真假*

### 总结
总结就是他们给的分析思路是错的，看最终的答案就知道，他们疯狂的重复，还喜欢给自己的无用重复找理由，真是要死