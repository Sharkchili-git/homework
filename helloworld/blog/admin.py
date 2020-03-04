from django.contrib import admin

# Register your models here.
from .models import Article


# 设置在 admnin管理界面显示的内容
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'publish_date']
    # 过滤器 选择日期
    list_filter = ('publish_date',)


# 将博客注册到 admin管理页面,才能显示博客
admin.site.register(Article, ArticleAdmin)

# 账号:suxintao
# 密码:123456789
