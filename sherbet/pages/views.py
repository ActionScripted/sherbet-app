from django.views.generic.base import TemplateView


class AppView(TemplateView):
    template_name = 'pages/app.html'


class IndexView(TemplateView):
    template_name = 'pages/index.html'


class RobotsView(TemplateView):
    content_type = 'text/plain'
    template_name = 'pages/robots.txt'
