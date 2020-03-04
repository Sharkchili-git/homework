from blog import views
from django.urls import path, include

urlpatterns = [
    # 正则表达式 ^:以...开头, $:以...结尾
    path(r'', views.hello),
    path(r'content', views.article_content),
    path(r'index/', views.get_index_page),
    # path(r'detail', views.get_detail_page)
    path(r'detail/<int:article_id>', views.get_detail_page, name="detail"),
    path(r'show', views.show_image),
    path(r'editblog/<article_id>', views.edit_page),
    path(r'submitblog', views.submit_blog),
]
