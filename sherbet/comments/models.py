from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from sherbet.models import HistoryMixin
from sherbet.families.models import FamilyMixin


class Comment(FamilyMixin, HistoryMixin):
    comment = models.TextField()
    content_object = GenericForeignKey('content_type', 'object_id')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.user_created}: {self.comment[:20]}...'


class CommentsMixin(models.Model):
    comments = GenericRelation('comments.Comment')

    class Meta:
        abstract = True
