from constance.admin import Config as ConstanceConfig
from constance.admin import ConstanceAdmin
from django.contrib import admin
from django.contrib import auth
from django.utils.translation import gettext_lazy
from reversion.admin import VersionAdmin
import django_celery_beat as celery_beat
import django_celery_results as celery_results

from sherbet.assets.models import Asset
from sherbet.assets.admin import AssetAdmin
from sherbet.comments.models import Comment
from sherbet.locations.models import Location
from sherbet.users.models import User


class ReversionAssetAdmin(VersionAdmin, AssetAdmin):
    """Reversion mixin for better admin history"""
    pass


class ReversionGroupAdmin(VersionAdmin, auth.admin.GroupAdmin):
    """Reversion mixin for better admin history"""
    pass


class ReversionPeriodicTaskAdmin(VersionAdmin, celery_beat.admin.PeriodicTaskAdmin):
    """Reversion mixin for better admin history"""
    pass


class ReversionTaskResultAdmin(VersionAdmin, celery_results.admin.TaskResultAdmin):
    """Reversion mixin for better admin history"""
    pass


class ReversionUserAdmin(VersionAdmin, auth.admin.UserAdmin):
    """Reversion mixin for better admin history"""
    pass


class SherbetAdminSite(admin.AdminSite):
    """
    @see /django/contrib/admin/sites.py
    """
    # Text to put at the end of each page's <title>.
    site_title = gettext_lazy('Sherbet')
    # Text to put in each page's <h1> (and above login form).
    site_header = gettext_lazy('Sherbet')
    # Text to put at the top of the admin index page.
    index_title = gettext_lazy('Administration')


# Admin site initialization
admin_site = SherbetAdminSite()


# Auth/Auth
admin_site.register(auth.models.Group, ReversionGroupAdmin)


# Celery Beat
admin_site.register(celery_beat.models.ClockedSchedule, VersionAdmin)
admin_site.register(celery_beat.models.CrontabSchedule, VersionAdmin)
admin_site.register(celery_beat.models.IntervalSchedule, VersionAdmin)
admin_site.register(celery_beat.models.PeriodicTask, ReversionPeriodicTaskAdmin)
admin_site.register(celery_beat.models.SolarSchedule, VersionAdmin)


# Celery Results
admin_site.register(celery_results.models.TaskResult, ReversionTaskResultAdmin)


# Constance (settings)
admin_site.register([ConstanceConfig], ConstanceAdmin)


# Sherbet: Main
admin_site.register(Asset, ReversionAssetAdmin)
admin_site.register(Comment, VersionAdmin)
admin_site.register(Location, VersionAdmin)
admin_site.register(User, ReversionUserAdmin)
