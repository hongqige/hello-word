#### 代码样例
```
select distinct Num as ConsecutiveNums from 
    (select Num,cvalue,count(1) as zz from
    (select Num,row_number() over(order by Id)-row_number() over(partition by Num order by Id) as cvalue from logs) x group by Num,cvalue order by   min(Num) ) y where zz>=3
```
**这是判断表里面至少连续三次出现的数据**
#### 思路
>  我们这里主要使用的是row_number() over(partition pid order by id)这个函数，我用了另外一个函数lag()，一直没有办法解决这个判断连续的问题，最后百度来这个办法，虽然是copy的，但是我大部分还是弄懂了

> 这个有两个排序，一个是不分类排序，代表着数据原来的位置，一个是分类排序，代表着分类以后的排序。
最核心的思想就是，如果原来的数据是相同，并且他们的数据相邻，就可以得到，两种排序的差值应该是相同的，这个我想了很久很久，因为博客里没有强调这个问题(所以tm的别再跟我说很显然这个问题，不然直接打死)
> 运用这个核心思想，就可以得到想要的结果，但要注意的是，得到的结果，相同值是有多个的，要记得过滤，leetcode上还特别提示我们，一定要加distinct(这个坑已经让我很多次一头雾水了)

#### lag()以及lead()
*由于这章节用的函数我已经记录并且会用，所以讲讲另外一个尝试使用的函数，也就是分类排序的结果取数*
**通俗的来讲，这个函数跟row_number（）有点相似，但是还是有一些不同，这个函数只能拿到需要的值，但是又会把你不要的值以一种你想要的形式返回给你（比如设置为null)，还有就是以上的值也给你（比如说给你同值三条以后的所有值都给你**
> lag()是上一条记录，lead相反

`lag(分类列，取第几条，没有时返回值) over(partition by 分类列 order by 排序列)   `

*网上也有第二个参数是偏移值，反正我就这么理解，用的时候再说吧*
