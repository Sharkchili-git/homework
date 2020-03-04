from django.urls import path, include
from weatherapi import views

urlpatterns = [
    path('weather', views.Weather.as_view())
]
