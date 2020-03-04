from django.urls import path, include

urlpatterns = [
    path('v1.0/juheapi/', include('jhapp.urls')),
    path('v1.0/apps/', include('jhapp.urls')),
    path('v1.0/weatherapi/', include('weatherapi.urls')),
]