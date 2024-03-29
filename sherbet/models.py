from django.db import models


class HistoryMixin(models.Model):
    """
    Todo:
        * Might make sense in its own app.
    """
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    user_created = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='%(class)s_user_created',
    )
    user_modified = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='%(class)s_user_modified',
    )

    class Meta:
        abstract = True
