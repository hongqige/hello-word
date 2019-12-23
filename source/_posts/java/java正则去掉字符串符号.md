---
title: '[java正则去掉字符串符号]'
date: 2019-12-20 13:51:03
tags: java
categories: java
---
<!-- toc -->
### 去除中文
```
        String REGEN_CHINESE = "[\u4e00-\u9fa5]";
        Pattern pat = Pattern.compile(REGEN_CHINESE);
        String str = "_测$试1a_一b_2种c#3?_=";
        Matcher mat = pat.matcher(str);
        System.out.println(mat.replaceAll(""));
```
### 去除下划线
```
        String UNDERLINE = "[_]";
        Pattern patUnderline = Pattern.compile(UNDERLINE);
        Matcher matUnderline = patUnderline.matcher(str);
        System.out.println(matUnderline.replaceAll(""));
```
### 去除中文跟下划线
```
        String REGEN_CHINESE_UNDERLINE = "[\u4e00-\u9fa5_]";
        Pattern patChineseUnderline = Pattern.compile(REGEN_CHINESE_UNDERLINE);
        Matcher matChineseUnderline = patChineseUnderline.matcher(str);
        System.out.println(matChineseUnderline.replaceAll(""));
```
### 去除特殊符号
```
        String regEx="[\n`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。， 、？]";
        Pattern patEx = Pattern.compile(regEx);
        Matcher matEx = patEx.matcher(str);
        System.out.println(matEx.replaceAll(""));
```
### 补充
需要匹配去除什么，直接在匹配式里面加就可以，不需要或这样的符号，当然，如果是式子匹配，还是需要多加一个转义符号的，例如匹配数字`\d`，就需要写成`\\d`，