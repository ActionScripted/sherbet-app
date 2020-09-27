from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from djmoney.models.fields import MoneyField


from sherbet.models import HistoryMixin


class Family(HistoryMixin):
    name = models.CharField(max_length=512)

    class Meta:
        verbose_name_plural = 'families'

    def __str__(self):
        return f'{self.name}'
