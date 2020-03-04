from django.shortcuts import render
from django.http import HttpResponse
from blog.models import Article
from django.core.paginator import Paginator


# Create your views here.

def hello(request):
    return HttpResponse('hello world 应用blog')


# 测试 显示文章内容
def article_content(request):
    article = Article.objects.all()[0]
    title = article.title
    brief_content = article.comtent
    content = article.comtent
    article_id = article.article_id
    publish_date = article.publish_date
    res = 'title:{},brief_content:{},content:{},article_id:{},publish_date:{}'.format(title, brief_content, content,
                                                                                      article_id, publish_date)
    return HttpResponse(res)


# 主页 + 分页 + 最新文章
def get_index_page(request):
    # 获取 URL 中的page的值
    page = request.GET.get('page')
    if page:
        page = int(page)
    else:
        # 首页特殊 没有page 赋值为1
        page = 1
    # 得到数据库中的 全部数据  (在这里取出全部的数据 要加入 order_by 排序,不然会出现警告)
    # UnorderedObjectListWarning: Pagination may yield inconsistent results with an unordered object_list: <class 'book.models.HeroInfo'> QuerySet.
    all_article = Article.objects.all().order_by('article_id')
    # 得到 最新的5篇文章 ( -publish_date:时间字段倒序)
    top5_article_list = Article.objects.order_by('-publish_date')[:5]
    # 分页 3篇分一页
    paginator = Paginator(all_article, 5)
    # 数据库中的博客共分了几页(5)
    page_num = paginator.num_pages
    # 当前页面的对象
    page_article_list = paginator.page(page)
    if page_article_list.has_next():  # 判断是否有下一页
        next_page = page + 1
    else:
        next_page = page
    if page_article_list.has_previous():  # 判断是否有上一页
        previous_page = page - 1
    else:
        previous_page = page
    return render(request, 'blog/index.html',
                  {
                      'article_list': page_article_list,
                      'page_num': range(1, page_num + 1),
                      # 'curr_page': page,
                      'next_page': next_page,
                      'previous_page': previous_page,
                      'top5_article_list': top5_article_list
                  })


# 文章详情页 + 上下页
def get_detail_page(request, article_id):
    # 得到数据库中的 全部数据
    all_article = Article.objects.all()
    curr_article = None
    previous_index = 0
    next_index = 0
    previous_article = None
    next_article = None
    # 获取(当前页面)文章和它对应的下标
    for index, article in enumerate(all_article):
        # 当前文章为第一篇的情况
        if index == 0:
            previous_index = 0
            next_index = index + 1
        # 当前文章为最后一篇的情况
        elif index == len(all_article) - 1:
            previous_index = index - 1
            next_index = index
        else:
            previous_index = index - 1
            next_index = index + 1
        # 当URL的ID与文章的ID对应才返回数据
        if article.article_id == article_id:
            curr_article = article
            previous_article = all_article[previous_index]
            next_article = all_article[next_index]
            # break
            # 将文章的内容以 \n 切分 达到美观的效果
            section_list = curr_article.comtent.split('\n')
            return render(request, 'blog/detail.html',
                          {
                              'curr_article': curr_article,
                              'section_list': section_list,
                              'previous_article': previous_article,
                              'next_article': next_article
                          })


# 显示图片
def show_image(request):
    return render(request, 'blog/show_p.html')


# 自定义404页面
# 在生产环境下使用  可以显示 404 界面
def not_find_page(request, exception):
    # return HttpResponse('界面没有找到')
    return render(request, 'blog/page404.html')


def edit_page(request, article_id):
    if article_id == '0':
        return render(request, 'blog/edit_blog.html')
    else:
        article = Article.objects.get(article_id=article_id)
        return render(request, 'blog/edit_blog.html', {
            "article": article
        })


#
#
def submit_blog(request):
    title = request.POST.get('title')
    brief_content = request.POST.get('brief_comtent')
    content = request.POST.get('comtent')
    article_id = request.POST.get('article_id')
    if article_id == '0':
        print('article_id is 0')
        # 把新编辑的blog添加到数据库
        Article.objects.create(title=title, brief_comtent=brief_content, comtent=content)
        # 最后返回首页(或者可以再创建个页面让用户选择继续编辑或回到首页)(或者显示这篇文章)
        return get_index_page(request)
    print('article_id is', article_id)
    article = Article.objects.get(pk=article_id)
    article.title = title
    article.brief_comtent = brief_content
    article.comtent = content
    article.save()
    return get_detail_page(request, article_id=article.article_id)
