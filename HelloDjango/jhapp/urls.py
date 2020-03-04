from django.urls import path, include
from jhapp import views

urlpatterns = [
    path('Today_in_history/', views.helloworld),
    path('testrequest/', views.testrequest),
    path('showimage/', views.image),
    # 类
    path('imagetext', views.ImageViews.as_view()),
    path('cookietest', views.CookieTest.as_view()),
    path('cookietest2', views.CookieTest2.as_view()),
    path('authorization', views.Authorization.as_view()),
    path('userview', views.UserView.as_view()),
    path('logout', views.Logout.as_view()),
    path('status', views.Status.as_view()),
    path('', views.showapps),
]
