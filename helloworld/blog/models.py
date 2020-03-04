from django.db import models


# Create your models here.
class Article(models.Model):
    article_id = models.AutoField(primary_key=True)
    title = models.TextField()
    brief_comtent = models.TextField()
    comtent = models.TextField()
    publish_date = models.DateTimeField(auto_now=True)

    # 在admin管理时 显示博客的title (默认显示article object)
    def __str__(self):
        return self.title

    # python2 时用的方法现在用不了
    # def __unicode__(self):
    #     return self.title
    class Meta(object):
        verbose_name = 'All articles'
        verbose_name_plural = verbose_name
