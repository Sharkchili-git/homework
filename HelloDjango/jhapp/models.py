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
            models.Index(fields=['nickname','openid'], name='name'),
        ]
