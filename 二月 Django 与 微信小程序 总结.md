# 二月 D jango 与 微信小程序 总结

### Django是什么?

- Django是一个由Python写成的Web应用框架。

### 为什么用它?

- Django的主要目的是简便、快速的开发数据库驱动的网站。它强调代码复用，多个组件可以很方便的以“插件”形式服务于整个框架，Django有许多功能强大的第三方插件，你甚至可以很方便的开发出自己的工具包。

### flask 和 django对比

​	相同:都是web后台框架

1. Django :
   - 大而全，功能极其强大，是Python web框架的先驱，用户多，第三方库极其丰富。
   - 非常适合企业级网站的开发，但是对于小型的微服务来说，总有“杀鸡焉有宰牛刀”的感觉，体量较大，非常臃肿，定制化程度没有Flask高，也没有Flask那么灵活。
2. Flask:
   - 小巧、灵活，让程序员自己决定定制哪些功能，非常适用于小型网站。
   - 对于普通的工人来说将毛坯房装修为城市综合体还是很麻烦的，使用Flask来开发大型网站也一样，开发的难度较大，代码架构需要自己设计，开发成本取决于开发者的能力和经验。

### 如何创建一个 Django 项目

1. ### Django常用命令:

   一般格式: python manage.py ***

   - django-admin.py startproject 项目名 (创建Django项目命令)
   - python manage.py help (查看Django命令)
   - python manage.py startapp 应用名(创建应用命令)
   - python manage.py runserver (运行Django项目)
   - python manage.py makemigrations  + python  manage.py migrate (生成数据库)
   - python manage.py createsuperuser (创建超级用户)
   - python manage.py shell (在这个 shell 里面调用当前项目的 models.py 中的 API，对于操作数据的测试非常方便)
   - python manage.py dbshell (Django 会自动进入在settings.py中设置的数据库，如果是 MySQL 或 postgreSQL,会要求输入数据库用户密码。在这个终端可以执行数据库的SQL语句)
   - 等....

### Django目录结构与各自的功能作用:?

​	路由:一个网页的地址(一个资源)和本地的视图是怎样关联起来的

​		不管是应用级还是项目级路由 ,都需要分别到项目的urls.py中配置    

​		完整路由: 项目的url路由 +  应用的url路由	

​	session存在于哪里:Django_session数据库表中

​	如何获取session:request.session

​	各种数据库如何配置:https://docs.djangoproject.com/en/2.2/ref/settings/

1. 项目文件:
   - settings.py       项目配置文件
   - urls.py              项目路由配置文件
   - wsgi.py             项目web服务器的网关接口,是python应用与Web服务器交互的接口，一般不需要做任何修改。
   - asgi.py              项目ASGI"的服务的入口文件了，内容基本同wsgi.py。(ASGI和WSGI，都是一种 Web 服务网关 接口协议，是在CGI的标准上构建的。
   - views.py           项目配置视图函数的文件(自己创建)
   - manage.py       项目管理文件
2. 应用文件:
   - migrations.py  项目数据迁移模块
   - views.py           项目视图处理的地方
   - models.py        项目定义应用模型的地方
   - admin.py          项目 定义admin模块管理对象的地方
   - apps.py             项目 声明应用的地方
   - tests.py             项目编写应用测试用例的地方
   - urls.py               项目(自行创建)管理应用路由的地方

### mcv模式

​	M(Model)、V(View)、C(Controller) ，MVC框架的核心思想是：解耦，让不同的代码块之间降低耦合，增强代码的可扩展性和可移植性，实现向后兼容。当前主流的开发语言都有MVC框架。

- M：主要用于对数据库层次的访问，对数据库进行增、删、改、查等操作；
- V：主要用于对结果的封装，生成html页面的内容；
- C：主要用于接收请求，处理业务逻辑，与Model和View交互，返回结果。

### 渲染:render 把界面的骨架 和 数据 融合起来



### blog应用

##### 	bootstrap:

​		先把 核心css 引入,然后把想用的代码 CV过来就好了 

##### admin:

​		    Django提供了基于web的管理工具。

##### 	jinjia2语法 :

​		   变量: {{变量}}

​		   for循环:{%for 变量 in 范围%} {%endfor%}

​		   if语句:{%if 条件%}{%endif%}

####       model		

##### 	orm:每个模型都是一个 Python 的类，这些类继承 :from django.db import models模型类的每个属性都相当于一个数据库的字段。

##### 	分页:from django.core.paginator import Paginator

​	Paginator  类实现分页

### api设计 restful:设计风格,面向资源

​	地址:资源 版本 资源a 小资源b 参数

### yaml 文件格式:

- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释

​    

### 类视图:

- from django.views import View  定义类视图需要继承自的Django提供的父类的View
- 配置路由时,需要使用类视图的as_view()方法来注册添加

​    

### mixin 设计思路

​	使用面向对象多继承的特性，可以通过定义父类（作为扩展类），在父类中定义想要向类视图补充的方法，类视图继承这些扩展父类，便可实现代码复用。定义的扩展父类名称通常以Mixin结尾。



## 小程序

### 目录结构:

- app.js：主要就是注册微信小程序应用
- app.json：一些微信小程序的全局配置，例如网络请求的超时时间，窗口的表现，各个页面的注册路径等等
- app.wxss：微信小程序整个的全局样式
- project.config.json：微信开发者工具的配置信息
- pages 存放小程序的所有页面，每个页面主要就是由四个文件组成
- utils *utils.js*：存放工具的函数，主要就是为了达到代码复用的目的

### 四种文件类型:

- *js文件*：存放微信小程序页面的逻辑和一些数据交互
- *json文件*：配置微信小程序页面的配置信息
- *wxml文件*：展示微信小程序页面的一些元素和内容
- *wxss文件*：存放页面样式

### app.js:小程序入口文件,小程序全局唯一变量app

​	globle变量

###  第三方组件:

​	weui: 在全局样式中 @import 路径 然后cv

### 界面写法:(常用标签)

- view 这个标签相当于div(它的特点就是在没有其他样式影响的情况下，宽度100%)；
- text 这个标签相当于span(它的特点就是在没有其他样式影响的情况下，不会独占一行，宽和高由内容撑开，这个时候你设置宽高是没有用的)；
- image 这个标签比较重要，图片组件。src 里面可以放网络地址和本地图片地址。
- button 这个是按钮组件。
- input 这个是输入框组件。
- navigator 这个是导航组件。

### 微信api:

- ​	wx.request(){}


### 生命周期函数:

#### 	界面和人一样有生老病死,处于什么状态就会触发相应的函数

<https://upload-images.jianshu.io/upload_images/8994870-4788759342d57e3c.png?imageMogr2/auto-orient/strip|imageView2/2/w/662/format/webp>

1. #### 组件生命周期函数

   - created  在组件实例刚刚被创建时执行
   - attached  在组件实例进入页面节点树时执行
   - ready   在组件在视图层布局完成后执行
   - moved   在组件实例被移动到节点树另一个位置时执行
   - detached   在组件实例被从页面节点树移除时执行
   - error   每当组件方法抛出错误时执行

2. #### 页面周期函数

   - onLoad	   生命周期回调--监听页面加载

   - onShow    生命周期回调--监听页面显示

   - onReady   生命周期回调--监听页面初次渲染完成

   - onHide     生命周期回调--监听页面隐藏

   - onUnload 生命周期回调--监听页面卸载


### 全局配置:

​	Windows配置(页面配置会覆盖全局配置)

​	tabbar配置



### 小程序的有状态服务和无状态服务

- 无状态服务:就是没有特殊状态的服务,各个请求对于服务器来说统一无差别处理,请求自身携带了所有服务端所需要的所有参数(服务端自身不存储跟请求相关的任何数据,不包括数据库存储信息)
- 有状态服务:与之相反,有状态服务在服务端保留之前请求的信息,用以处理当前请求,比如session等

### 小程序的用户体系的构建

	小程序先去访问微信服务器
	--> code
	小程序--> django
	---> code + appid + secretkey --> wx服务器
	>>openid
	
	--> django后台
	
	给这个用户添加额外的描述信息(添加状态)
	
	--> 有状态的首页的实现
### wx.navigateTo() ，Wx. redirectTo()，wx. switchTab() ,WX . navigateBack()，wx. reLaunch()的区别:

- wx.navigateTo(): 保留当前页面，跳转到应用内的某个页面。但是不能跳到tabbar 页面
- wx.redirectTo(): 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到tabbar 页面
- wx.switchTab(): 跳转到abBar 页面，并关闭其他所有非tabBar 页面
- wx.navigateBack()关闭当前页面， 返回上一页面或多级页面。可通过getCurrentPages() 获取当前的页面栈,决定需要返回几层
- wx.reLaunch(): 关闭所有页面，打开到应用内的某个页面