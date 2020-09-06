from django.urls import path

from sherbet.pages.views import AppView


app_name = 'pages'

urlpatterns = [
    path('', AppView.as_view(), name='app'),
]
