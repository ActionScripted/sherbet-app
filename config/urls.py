"""URL Configuration
"""
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.urls import include
from django.urls import path
from django.views import defaults as default_views
from django.views.csrf import csrf_failure
from graphene_django.views import GraphQLView

from sherbet.admin import admin_site


# Standard (Django) URL patters
urlpatterns = [
    # App
    path('', include('sherbet.pages.urls', namespace='pages')),
    path('', include('sherbet.users.urls', namespace='users')),
    # Auth
    path('admin/', admin_site.urls),
    path('hijack/', include('hijack.urls', namespace='hijack')),
    # GraphQL
    path('graphql', GraphQLView.as_view(graphiql=True)),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "403_csrf/",
            csrf_failure,
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]

    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar
        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
