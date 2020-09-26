from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from djmoney.models.fields import MoneyField


from sherbet.comments.models import Comment
from sherbet.models import HistoryMixin


class Asset(HistoryMixin):
    comments = GenericRelation(Comment)
    cost = MoneyField(max_digits=14, decimal_places=2, default_currency='USD')
    location = models.ForeignKey('locations.Location', blank=True, null=True, on_delete=models.CASCADE)
    manual_url = models.URLField(blank=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return f'{self.name}'
