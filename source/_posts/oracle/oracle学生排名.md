---
title: '[oracle学生排名]'
date: 2019-12-25 21:02:39
tags: oracle
---
### 题目
1、考试排名计算（数据库对应表：human_exam）
Human_exam表存储了一个班学生每人每个月的考试成绩（存在有些月份考试人员缺勤的情况），现在需要查询出human_id=6的用户，按照考试时间，从远到近每次的考试名次。
学校规定的考试名次核算规则：
1、 按照当月所有考生的成绩从高到低排名；
2、 如果遇到分数一样，则按照年龄大小，同等分数年纪小的学生排名靠前；
3、 如果成绩一样，年龄也一样，则对比他们上次的名次，进步大的排名靠前。

### 数据表
```
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for human_exam
-- ----------------------------
DROP TABLE IF EXISTS `human_exam`;
CREATE TABLE `human_exam` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '涓婚?id锛??澧',
  `human_id` int(11) DEFAULT '0' COMMENT '?ㄦ?ID',
  `examScore` int(11) DEFAULT NULL COMMENT '???寰??',
  `dateTime` varchar(255) DEFAULT NULL COMMENT '?堕?',
  `uAge` int(11) DEFAULT '0' COMMENT '骞撮?',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='???寰??琛';

-- ----------------------------
-- Records of human_exam
-- ----------------------------
INSERT INTO `human_exam` VALUES ('1', '13', '0', '2016-12', '26');
INSERT INTO `human_exam` VALUES ('2', '14', '0', '2016-12', '40');
INSERT INTO `human_exam` VALUES ('4', '16', '120', '2016-12', '44');
INSERT INTO `human_exam` VALUES ('5', '3', '30', '2016-12', '21');
INSERT INTO `human_exam` VALUES ('6', '10', '37', '2016-12', '19');
INSERT INTO `human_exam` VALUES ('7', '6', '56', '2016-12', '19');
INSERT INTO `human_exam` VALUES ('8', '2', '67', '2016-12', '17');
INSERT INTO `human_exam` VALUES ('9', '4', '78', '2016-12', '29');
INSERT INTO `human_exam` VALUES ('11', '16', '60', '2017-02', '44');
INSERT INTO `human_exam` VALUES ('12', '3', '100', '2017-02', '21');
INSERT INTO `human_exam` VALUES ('13', '13', '12', '2017-02', '26');
INSERT INTO `human_exam` VALUES ('14', '10', '16', '2017-02', '19');
INSERT INTO `human_exam` VALUES ('15', '4', '22', '2017-02', '29');
INSERT INTO `human_exam` VALUES ('16', '6', '28', '2017-02', '19');
INSERT INTO `human_exam` VALUES ('17', '14', '33', '2017-02', '40');
INSERT INTO `human_exam` VALUES ('18', '2', '50', '2017-02', '17');
INSERT INTO `human_exam` VALUES ('19', '3', '100', '2017-03', '21');
INSERT INTO `human_exam` VALUES ('20', '16', '100', '2017-03', '44');
INSERT INTO `human_exam` VALUES ('21', '4', '110', '2017-03', '29');
INSERT INTO `human_exam` VALUES ('22', '2', '17', '2017-03', '17');
INSERT INTO `human_exam` VALUES ('24', '13', '62', '2017-03', '26');
INSERT INTO `human_exam` VALUES ('25', '10', '73', '2017-03', '19');
INSERT INTO `human_exam` VALUES ('26', '6', '78', '2017-03', '19');
INSERT INTO `human_exam` VALUES ('27', '14', '78', '2017-03', '40');
INSERT INTO `human_exam` VALUES ('28', '2', '140', '2017-04', '17');
INSERT INTO `human_exam` VALUES ('29', '3', '18', '2017-04', '21');
INSERT INTO `human_exam` VALUES ('30', '4', '110', '2017-04', '29');
INSERT INTO `human_exam` VALUES ('31', '6', '15', '2017-04', '19');
INSERT INTO `human_exam` VALUES ('32', '10', '45', '2017-04', '19');
INSERT INTO `human_exam` VALUES ('33', '13', '140', '2017-04', '26');
INSERT INTO `human_exam` VALUES ('34', '14', '110', '2017-04', '40');
INSERT INTO `human_exam` VALUES ('36', '16', '50', '2017-04', '44');
INSERT INTO `human_exam` VALUES ('53', '2', '71', '2017-05', '17');
INSERT INTO `human_exam` VALUES ('54', '3', '90', '2017-05', '21');
INSERT INTO `human_exam` VALUES ('55', '4', '0', '2017-05', '29');
INSERT INTO `human_exam` VALUES ('56', '6', '150', '2017-05', '19');
INSERT INTO `human_exam` VALUES ('57', '10', '150', '2017-05', '19');
INSERT INTO `human_exam` VALUES ('58', '13', '26', '2017-05', '26');
INSERT INTO `human_exam` VALUES ('59', '14', '90', '2017-05', '40');
INSERT INTO `human_exam` VALUES ('60', '16', '51', '2017-05', '44');
INSERT INTO `human_exam` VALUES ('61', '2', '71', '2017-08', '17');
INSERT INTO `human_exam` VALUES ('62', '3', '90', '2017-08', '21');
INSERT INTO `human_exam` VALUES ('63', '4', '0', '2017-08', '29');
INSERT INTO `human_exam` VALUES ('64', '6', '150', '2017-08', '19');
INSERT INTO `human_exam` VALUES ('65', '10', '150', '2017-08', '19');
INSERT INTO `human_exam` VALUES ('66', '13', '26', '2017-08', '26');
INSERT INTO `human_exam` VALUES ('67', '14', '90', '2017-08', '40');
INSERT INTO `human_exam` VALUES ('68', '16', '51', '2017-08', '44');
```

### 答案
```
 select * from (select
case when @xxdate=aa.dateTime then @p:=@p+1 else @p:=1 end  as rowNum,@xxdate:=datetime as datetime,aa.id,human_id,examScore,uAge from
( SELECT
  --  @r:= case when @datetime=a.datetime then @r+1 else 1 end as rowNum,
		a.Id,
		a.human_id,
    -- @datetime:=a.datetime as datetime,
		a.dateTime,
    a.examscore,
		a.uAge,
		-- c.dateTime as dateTime1,c.human_id as human_id1,c.examScore as examScore1
		c.examScore as cexamScore
from
    human_exam a left join human_exam c on a.human_id=c.human_id -- ,(select @r:=0,@datetime:='') b
 and c.dateTime=(select max(dateTime) from human_exam d where a.human_id=d.human_id and a.dateTime>d.dateTime )
 -- ORDER BY a.dateTime, a.examScore DESC, a.uAge,a.examScore-IFNULL(c.examScore,0)  desc
 ) aa,(select @p:=0,@xxdate:='') e  order by dateTime,examScore desc,uAge ,examScore-cexamScore desc) endtable where human_id=6
 ```