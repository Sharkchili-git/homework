from app1 import views
from django.urls import path, include

urlpatterns = [
    path('', views.hello)
]