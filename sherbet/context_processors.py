from django.conf import settings


def webpack_proxy(request):
    """
    Check for our webpack proxy header but use the client host
    for the return proxy path.
    """

    response = {'webpack_proxy': ''}

    if settings.DEBUG and request.META.get('HTTP_X_WEBPACK_PROXY_HOST'):
        response['webpack_proxy'] = 'http://' + request.META.get('HTTP_HOST')

    return response
