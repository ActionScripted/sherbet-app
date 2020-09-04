from django import template
from django.utils.safestring import mark_safe


register = template.Library()


@register.simple_tag(takes_context=True)
def nav_active(context, url_pattern, classes=''):
    active_class = ''

    try:
        if context['nav_active'] == url_pattern:
            active_class = 'is-active'
    except KeyError:
        pass

    return mark_safe('class="{} {}"'.format(classes, active_class))


@register.simple_tag(takes_context=True)
def nav_set_active(context, url_pattern):
    context['nav_active'] = url_pattern
    return ''
