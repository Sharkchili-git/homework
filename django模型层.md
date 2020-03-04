# 模型层

### 跨DB迁移

#### 	Django orm 框架:

- ​		屏蔽了数据库的差异
- ​                提供了迁移工具
- ​                简化了开发过程

1. #### 为什么要从 sqlite3 迁移到 MySQL?

   - sqlite3只是项目初期的时候使用便利
   - sqlite3是文件数据库,性能跟不上
   - MySQL是工业界常用的数据库,而且开源免费

2. #### 迁移过程中最重要的两样东西: 数据;表结构

   #### 		数据库备份 导出数据(只能导出本应用的数据)

   ​		python manage.py dumpdata 应用名>应用名.json

   #### 		数据表结构同步

   ​		设置 settings.py文件中的DATABASES字段(见HelloDjango项目)

   #### 		迁移数据库表(数据库有表无数据)

   ​		python manage.py migrate  --run--syncdb --database slave

   #### 		迁移数据

   ​		python managepy loaddata  应用名.json		(dumpdata 命令生成的 json文件)

​	

### 数据库索引:

1. #### 索引的概念:

   - 例子:如同书的目录
   - 辅助数据结构,卫龙快速的找到想要的数据
   - B+树
   - 加快了检索的速度
   - 降低了 插入 删除 更新 的速度
2.  #### 应该被索引的字段:
   - 需要排序的字段(order_by)
   - 需要比较操作的字段(<, >, >=, <=)
   - 需要过滤操作的字段(filter,exclude)
3. #### 添加索引的方式:
   - 属性中定义: 对于模型字段添加  db_index=True (任何表结构的改变都需要迁移数据库)

   - 默认的索引规则:

     - 主键 必定是索引
     - 唯一 也是索引
     - 外键 默认也是索引

   - 模型中的Meta属性类:

     - 定义:每个模型类下都有一个子类Meta，这个子类就是定义元数据的地方。Meta类封装了一些数据库的信息，称之为模型的元数据。

     - Meta 中的属性参考如下网址:

       https://docs.djangoproject.com/en/dev/ref/models/options/ 

       https://www.jianshu.com/p/774a8f16d624 

       https://blog.csdn.net/bbwangj/article/details/79967858 

     - ```
       db_table = 'xxx'  #修改表名为xxx
       indexes = [
                   # models.Index(fields=['nikename']),#将nickname字段设置为索引
                   models.Index(fields=['nickname','openid'], name='name'),#将nickname,openid两个字段设置为联合索引 并且命名为 name
               ]
       ```


### 模型层关系映射

1. ##### 三种关系映射:

   - ##### 一对一

     A表中的一条记录只能与B表中的一条记录相关联
     如：一夫一妻制

   - ##### 一对多

     A表中的一条数据可以与B表中的多条数据关联
     B表中的一条数据只能与A表中的一条数据关联

     如：*出版社(Publisher) 和 图书(Book)*

     　　*商品类型(GoodsType) 和 商品(Goods)*

     在数据库中的体现:
     通过外键(ForeignKey)来体现一对多
     在"多"表中增加外键(ForeignKey)对"一"表的主键进行引用

   - ##### 多对多

     A表中的一条记录可以与B表中的任意多条记录匹配
     B表中的一条记录可以与A表中的任意多条记录匹配
     如：作者与书籍

     在数据库中的体现:
     必须创建第三张表，关联涉及到的两张表数据

2. Django表达三种关系映射:

   - 一对一 :  OneToOneField
   - 一对多(多对一) : ForeignKey
   - 多对多 : ManyToManyField

3. 

   ```
   from django.db import models
   
   # Create your models here.
   class Publisher(models.Model):
       id = models.AutoField(primary_key=True)
       name = models.CharField(max_length=12)
       addr = models.TextField()
       date = models.DateField()
   
   class Book(models.Model):
       title = models.CharField(max_length=12)
       price = models.DecimalField(max_digits=6,decimal_places=2)
       isbn = models.CharField(max_length=20,unique=True)
       pulisher = models.ForeignKey(to='Publisher')
   
   class Author(models.Model):
       name = models.CharField(max_length=12)
       gender=models.SmallIntegerField(choices=((1,'男'),(2,'女'),(3,'保密')),default=3)
   
       phone=models.CharField(max_length=11,unique=True)
       email=models.EmailField()
       book = models.ManyToManyField(to='Book',related_name='authors')
       info = models.OneToOneField(to='Authorinfo',related_name='infos')
   
   class Authorinfo(models.Model):
       birthday=models.DateTimeField()
       city=models.CharField(max_length=12)
       is_marry=models.BooleanField()
       income = models.BigIntegerField()
   ```


### 增删改查基本操作

需要单独运行,并且需要用到django的模型,我们需要先建立django的环境

```
import django
import os
# myfirstproj为你自己的项目名
os.environ['DJANGO_SETTINGS_MODULE'] = 'myfirstproj.settings'
django.setup()
```

```python
def ranstr(length):
    CHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    salt = ''
    for i in range(length):
        salt += random.choice(CHS)
    return salt

# 添加一个用户
def add_one():
    # 1 需要 save保存  
    user = User(open_id = 'test_open_id', nickname='test_nickname')
    user.save()

    # 2 自动保存 create
    User.objects.create(open_id = 'test_open_id2', nickname='test_nickname2')

# 增：批量  bulk_create
def add_batch():
    new_user_list = []
    for i in range(10):
        open_id = ranstr(32)
        nickname = ranstr(10)
        user = User(open_id=open_id, nickname=nickname)
        new_user_list.append(user)
    User.objects.bulk_create(new_user_list)

# 查询 get
def get_one():
    user = User.objects.get(open_id='test_open_id')
    print(user)

# 数据过滤 filter
def get_filter():
    users = User.objects.filter(open_id__contains='test_')
    # open_id__startswith
    # 大于: open_id__gt(greater than)
    # 小于: open_id__lt(little than)
    # 大于等于：open_id__gte(greater than equal)
    # 小于等于：open_id__lte(little than equal)
    print(users)

# 数据排序 order_by
def get_order():
    users = User.objects.order_by('open_id')
    print(users)

# 连锁查询
# 和管道符类似
def get_chain():
    users = User.objects.filter(open_id__contains='test_').order_by('open_id')
    print(users)

# 改一个 
def modify_one():
    user = User.objects.get(open_id = 'test_open_id')
    user.nickname = 'modify_username'
    user.save()

# 批量改
def modify_batch():
    User.objects.filter(open_id__contains='test_').update(nickname='modify_uname')

def delete_one():
    User.objects.get(open_id='test_open_id').delete()

# 批量删除
def delete_batch():
    User.objects.filter(open_id__contains='test_').delete()

# 全部删除
def delete_all():
    User.objects.all().delete()
    # User.objects.delete()


```

```python
# ---------数据库函数----------------
# 数据库函数
# 字符串拼接：Concat

from django.db.models import Value
from django.db.models.functions import Concat
# annotate创建对象的一个属性, Value,如果不是对象中原有属性
def concat_function():
    user = User.objects.filter(open_id='test_open_id').annotate(
        # open_id=(open_id), nickname=(nickname)
        screen_name = Concat(
            Value('open_id='),
            'open_id',
            Value(', '),
            Value('nickname='),
            'nickname')
        )[0]
    print('screen_name = ', user.screen_name)

# 字符串长度： Length
from django.db.models.functions import Length

def length_function():
    user = User.objects.filter(open_id='test_open_id').annotate(
        open_id_length = Length('open_id'))[0]

    print(user.open_id_length)

# 大小写函数
from django.db.models.functions import Upper, Lower

def case_function():
    user = User.objects.filter(open_id='test_open_id').annotate(
        upper_open_id=Upper('open_id'),
        lower_open_id=Lower('open_id')
    )[0]
    print('upper_open_id:', user.upper_open_id, ', lower_open_id:', user.lower_open_id)
    pass

# 日期处理函数
# Now()

from apis.models import App
from django.db.models.functions import Now

def now_function():
    # 当前日期之前发布的所有应用
    apps = App.objects.filter(publish_date__lte=Now())
    for app in apps:
        print(app)


# 时间截断函数
# Trunc
from django.db.models import Count
from django.db.models.functions import Trunc


def trunc_function():
    # 打印每一天发布的应用数量
    app_per_day = App.objects.annotate(publish_day=Trunc('publish_date', 'month'))\
        .values('publish_day')\
        .annotate(publish_num=Count('appid'))

    for app in app_per_day:
        print('date:', app['publish_day'], ', publish num:', app['publish_num'])

    pass



```

