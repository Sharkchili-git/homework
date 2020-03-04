from django.test import TestCase
import yaml
import os
import django

# Create your tests here.

# filename = r'D:/PycharmProjects/HelloDjango/HelloDjango/appcomfig.yaml'
#
# with open(filename, 'r', encoding='utf-8')as f:
#     res = yaml.load(f, Loader=yaml.FullLoader)
#     print(res)


# 一样
# d = os.path.dirname(__file__)
# d = os.getcwd()
# b = os.path.dirname(d)
# a = os.listdir(b)
# # for i in a:
# #     if i == 'static':
# i = 'static'
# if i in a:
#     print(b, i)
#     c = os.path.join(b, i)
#     print(c)
#     print(os.listdir(c)[0])
#     print(os.path.join(c, os.listdir(c)[0]).replace('\\', '/'))

# 配置环境
os.environ['DJANGO_SETTINGS_MODULE'] = 'HelloDjango.settings'
# os.environ.setdefault('DJANGO_SETTING_MODULE', 'HelloDjango.settings')
django.setup()

# 模型类要在 环境配置 后面再导入
from jhapp.models import User

res = User.objects.get(nickname='苏鑫涛')
# res = User.objects.filter(openid__)
print(res.focus_cities)
