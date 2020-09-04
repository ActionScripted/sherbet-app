from celery.utils.log import get_task_logger
from config import celery_app
from django.conf import settings
from django.core import management


logger = get_task_logger(__name__)


@celery_app.task
def task_test():
    """Need to test tasks? Here ya go!"""
    return "Test Task"


@celery_app.task
def reversion_cleanup():
    """
    Cleanup revisions 30 days old or older.
    """
    management.call_command(
        'deleterevisions',
        f'--days={settings.REVERSION_CLEANUP_DAYS}',
        f'--keep={settings.REVERSION_CLEANUP_KEEP}'
    )
