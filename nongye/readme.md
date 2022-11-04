# 项目技术栈

1. uni-app - 框架

2. vue - 框架

3. vant - 基于vue的组件库

4. stylus - css预处理器，方便写css

5. css变量 - 设置一些样式规范，方便以后更改整个项目的样式

6. npm - 包管理工具，方便调用模块

7. git - 版本控制工具，方便协同工作和存放项目

   

# 项目结构

nongye
├─.hbuilderx         **// hbuilder文件初始化文件夹，不用理会**

├─base   **// 存放基础组件，导航栏和底部tabber**

├─common  **// 存放公共函数**

├─components  **// 存放公共组件，方便重复使用**

├─node_modules  **// npm包**

├─pages  **// 页面文件，创建新的需要在page.json注册**

├─static  **// 静态文件，存放图标，图片和styl文件**

│  ├─iconfont **// 图标文件**

│  ├─images **// 图片文件**

│  └─styl  **// css文件**

└─unpackage **// uni-app的打包文件，不用理会**

├─wxcomponents  **// vant-weapp文件夹**



### stylus

└─styl

​	common.styl  **// 设置公用classname**        

​	index.styl  **// 引入所有styl入口**

​	standard.styl   **// 设置项目统一的css样式，暂时还没做好**

### Index

├─index.vue  // 页面路由，主页的页面都在这里注册，因为项目做的是单页面应用



# 规范

1. 组件命名使用**大驼峰**命名法,例如AppHeader.vue

2. classname，若多个单词，使用 **- ** 连接，例如content-text-main

3. 变量名，函数名使用**小驼峰**命名法, 例如clickButton()

4. 写好**注释**！

   函数注释可以这样写：

   ```javascript
   // 写出函数目的，形参类型和介绍
   /**
    * 请求云函数 
    * @param {String} api 请求接口名称
    * @param {String} params 请求参数
    */
   export default function apiRequest(api, params) {
   	try {
   		return new Promise(resolve => {
   			wx.cloud.callFunction({
   				name: api,
   				data: params
   			}).then(res => {
   				resolve(res.result)
   			})
   		})
   	} catch (err) {
   		console.error(err)
   	}
   }
   ```

   

# css样式

主题色 #35ae6b



文字大小 (small) 24rpx

文字大小 (normal) 28rpx

文字大小 (big) 32rpx



# 参考资料

1. 微信小程序官方文档 https://developers.weixin.qq.com/miniprogram/dev/framework/
2. 廖雪峰git教程 https://www.liaoxuefeng.com/wiki/896043488029600
3. vant组件库 https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet
4. vue文档 https://cn.vuejs.org/v2/guide/
5. stylus文档 https://www.stylus-lang.cn/
6. uni-app API文档 https://uniapp.dcloud.io/api/