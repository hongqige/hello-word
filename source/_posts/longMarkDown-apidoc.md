---
title: '[longMarkDown][apidoc]'
date: 2019-12-26 19:51:27
tags:
---
# 接口文档 v1.0.0

微信接口

- [1000_ownVote](#1000_ownvote)
	- [1001 获取验证码](#1001-获取验证码)
	- [1002 登录](#1002-登录)
	- [1003 正在进行的投票](#1003-正在进行的投票)
	- [1004 已结束的投票](#1004-已结束的投票)
	- [1005 参与的投票](#1005-参与的投票)
	- [1006 查看投票详情](#1006-查看投票详情)
	- [1007 投票](#1007-投票)



# 1000_ownVote

## 1001 获取验证码

<p>业主投票登录入口</p>

	GET /wx/ownVote/getCode


### Examples

请求示例:

```
http://{{url}}/wx/ownVote/getCode
 {"mobile":"15722540201"}
{
     mobile：业主手机号，必须是登记房屋时填写的号码
}
```
响应示例:

```
 {
    "code": 0,
    "message": "发送验证码成功"
}
```

## 1002 登录

<p>业主投票登录入口</p>

	POST /wx/ownVote/login

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| token			| String			|  <p>身份凭证</p>							|

### Examples

请求示例:

```
http://{{url}}/wx/ownVote/login
 {"mobile":"15722540201","validCode":"123456"}
{
     mobile：业主手机号，必须是登记房屋时填写的号码
     validCode：验证码
}
```
响应示例:

```
 {
    "code": 0,
    "data": {
        "activeTime": 1800,
        "token": "20dce8b30d00142ee9b345722f4b2081ee"
    },
    "message": "登录成功"
}
```

## 1003 正在进行的投票



	GET /wx/ownVote/now


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content			| JSON			|  							|

### Examples

请求示例:

```
http://{{url}}/app/ownVote/now
```
响应示例:

```
 {
    "code": 0,
    "data": [
        {
            "createDate": 1571846400000,
            "endDate": 1572451200000,
            "id": "688ea8be86ee47cfa7fdb0d07a310461",
            "initiatorId": "hzfree020160fsh0cloud0system0crz",
            "initiatorName": "系统管理员",
            "title": "标题3",
            "type": 0
        }
    ],
    "message": "处理成功"
}
```

## 1004 已结束的投票

<p>获取已结束的投票</p>

	GET /wx/ownVote/past


### Examples

请求示例:

```
http://{{url}}/app/ownVote/past
```
响应示例:

```
 {
    "code": 0,
    "data": [
        {{
            "content": "erqewr",
            "createDate": 1571846400000,
            "endDate": 1572451200000,
            "id": "f23325477ed94d67a3c5e1eaf07104ee",
            "initiatorId": "hzfree020160fsh0cloud0system0crz",
            "initiatorName": "系统管理员",
            "title": "ceshi1",
            "type": 0
        }
    ],
    "message": "处理成功"
}
```

## 1005 参与的投票

<p>获取参与的投票</p>

	GET /wx/ownVote/partIn


### Examples

请求示例:

```
http://{{url}}/app/ownVote/partIn
{"mobile":"15722540201"}
```
响应示例:

```
 {
    "code": 0,
    "data": [
        {{
            "content": "erqewr",
            "createDate": 1571846400000,
            "endDate": 1572451200000,
            "id": "f23325477ed94d67a3c5e1eaf07104ee",
            "initiatorId": "hzfree020160fsh0cloud0system0crz",
            "initiatorName": "系统管理员",
            "title": "ceshi1",
            "type": 0
        }
    ],
    "message": "处理成功"
}
```

## 1006 查看投票详情



	POST /wx/ownVote/view

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| token			| String			|  <p>身份凭证</p>							|

### Examples

请求示例:

```
http://{{url}}/wx/ownVote/view
{"id":"bb4a9da35f490ca0015f52d4185f3dd1","mobile":"15722540201"}
{
     id:投票项标识
     mobile:业主手机号，这里可以不填
}
```

## 1007 投票



	POST /wx/ownVote/submit

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| token			| String			|  <p>身份凭证</p>							|

### Examples

请求示例:

```
http://{{url}}/wx/ownVote/submit
content={"obj":{"id":"bb4a9da35f490ca0015f52d4185f3dd1","mobile":"15722540201","voteOption":"1"}}
{
     id:投票项标识
     mobile:业主手机号
     voteOption:1    //1-同意 2-反对 3-弃权
}
```


