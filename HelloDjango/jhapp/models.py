from django.db import models


# Create your models here.

class User(models.Model):
    openid = models.CharField(max_length=64, unique=True)
    nickname = models.CharField(max_length=64)
    # 关注的城市
    focus_cities = models.TextField(default='[]')
    # 关注的星座
    focus_constellations = models.TextField(default='[]')
    # 关注的股票
    focus_stocks = models.TextField(default='[]')

    def __str__(self):
        return self.nickname

    class Meta:
        # 更改表名
        db_table = 'wechat_user'
        # 添加 索引
        indexes = [
            # models.Index(fields=['nikename']),
            models.Index(fields=['nickname', 'openid'], name='name'),
        ]


# # 常用字段总结
#
# auto = models.AutoField()  # 自增长字段(int,递增加1)
# bigauto = models.BigAutoField()  # 比AutoField大(十亿,二十亿)
#
# # 二进制数据
# binary = models.BinaryField()
#
# # 布尔型
# boolean = models.BooleanField()  # 不允许为空
# nullboolean = models.NullBooleanField()  # 允许为空
#
# # 整形  带Positive的只能是正整数
# positivesmallinteger = models.PositiveSmallIntegerField()  # 正整数 大小为5个字节
# smallinteger = models.SmallIntegerField()  # 正 负整数 大小为6个字节
# positiveinteger = models.PositiveIntegerField()  # 正整数 大小为10个字节
# integer = models.IntegerField()  # 11个字节
# biginteget = models.BigIntegerField()  # 20个字节
#
# # 字符串类型
# char = models.CharField()  # varchar  需要指定长度 例如:max_length=64
# text = models.TextField()  # longtext 不需要指定长度
#
# # 时间日期类型
# date = models.DateField()  # 年月日
# datetime = models.DateTimeField()  # 年月日时分秒
# duration = models.DurationField()  # 一段时间 int类型 通过 python timedelte 实现的
#
# # 浮点型
# float = models.FloatField()
# decimal = models.DecimalField()  # 需要指定整数有多少位,小数有多少位
#
# # 其他字段
# email = models.EmailField()  # 邮箱
# image = models.ImageField()  # 图片
# file = models.FileField()  # 文件
# filepath = models.FilePathField()  # 文件路径
# url = models.URLField()  # url
# uuid = models.UUIDField()  # uuid
# genericipaddress = models.GenericIPAddressField()  # ip地址
