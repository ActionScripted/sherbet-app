from django.urls import path

from sherbet.pages import views


app_name = 'pages'

urlpatterns = [
    path('', views.AppView.as_view(), name='app'),
    path('robots.txt', views.RobotsView.as_view(), name='robots'),
]
