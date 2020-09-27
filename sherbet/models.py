from django.contrib.contenttypes.fields import GenericRelation
from django.db import models


class CommentsMixin(models.Model):
    comments = GenericRelation('comments.Comment')

    class Meta:
        abstract = True


class FamilyMixin(models.Model):
    family = models.ForeignKey(
        'families.family',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='%(class)s_family',
    )

    class Meta:
        abstract = True


class LocationMixin(models.Model):
    location = models.ForeignKey(
        'locations.Location',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='%(class)s_location',
    )

    class Meta:
        abstract = True


class HistoryMixin(models.Model):
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
