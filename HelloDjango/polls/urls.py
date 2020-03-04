from django.urls import path
from . import views

urlpatterns = [
    # path("", views.index, name='index')
    path("Hello_World", views.index)
]
