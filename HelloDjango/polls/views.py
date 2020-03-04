from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    return HttpResponse("Hello World. You're at the polls index.")

# request 参数就是HTTP请求的对象
# 函数不可以直接返回字符串,要返回 HTTPResponse
