from django.urls import path

from sherbet.pages import views


app_name = 'pages'

urlpatterns = [
    # App "routes"
    path('', views.AppView.as_view(), name='app'),
    path('login/', views.AppView.as_view(), name='login_fake'),
    path('users/', views.AppView.as_view(), name='users'),
    # SEO
    path('robots.txt', views.RobotsView.as_view(), name='robots'),
]
