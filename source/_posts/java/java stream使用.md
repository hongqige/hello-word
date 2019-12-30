### 简介
> stream是java8开始有的新特性，可以帮助开发者将集合转化为流，不需要再循环遍历集合，能够有效提高执行效率。在实际开发中，我使用最多的是list,本章也以list使用来作为样例。

### 重点
* stream() − 为集合创建串行流。

* parallelStream() − 为集合创建并行流。

*用最多的是串行，用并行有点担心*
### forEach()
**foreach是最基础的一种用法，对集合中的每个对象进行操作，无返回值**
##### 样例：
```
List<String> list = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
list.stream().forEach(item->{
    sout(item);
    });
```
### filter()
**fileter是对集合进行筛选，筛选完的数据再规约一下返回，参数为true则选中，为false不选中**
##### 样例：
```
List<String> list = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
List<String> list1 = list.stream().filter(!item.equals("")).collect(Collect.toList();
```
### map()
**map是对每个对象进行分离或者其他操作，比如取出对象的某个属性，对属性修改等操作**
##### 样例：
```
List<String> list = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
List<String> list1 = list.stream().map(item+"L").collect(Collect.toList());
```
### group()
**group是对集合进行分类，跟数据库的group by是一样的，由于是分类，每个类别都是一个list，所以返回值应该是一个map，具体是Map<String,List<T>>**
##### 样例：
```
public static List<User> getUserList(){
User user1 = new User(1,"张三","小学");
User user2 = new User(2,"李四","小学");
User user3 = new User(3,"王五","初中");
User user4 = new User(4,"马六","高中");
 
List<User> list = new ArrayList<User>();
list.add(user1);
list.add(user2);
list.add(user3);
list.add(user4);

Map<String,List<User>> userGroupMap = list.stream().collect(Collectors.groupingBy(User::getType));
```
*这里有省略一些，反正能看出来，输出结果<br>{高中=[com.maps.User@448139f0], 初中=[com.maps.User@7cca494b], 小学=[com.maps.User@7ba*

### 其他
**规约我们在上面就有用到，不再介绍，除此之外，还有排序、统计、限定等操作，介绍一下统计吧**
```
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
 
IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics();
 
System.out.println("列表中最大的数 : " + stats.getMax());
System.out.println("列表中最小的数 : " + stats.getMin());
System.out.println("所有数之和 : " + stats.getSum());
System.out.println("平均数 : " + stats.getAverage());
```

