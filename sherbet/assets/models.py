from django.db import models
from djmoney.models.fields import MoneyField

from sherbet.comments.models import CommentsMixin
from sherbet.families.models import FamilyMixin
from sherbet.locations.models import LocationMixin
from sherbet.models import HistoryMixin


class Asset(LocationMixin, FamilyMixin, CommentsMixin, HistoryMixin):
    cost = MoneyField(
        decimal_places=2,
        default_currency='USD',
        max_digits=14, )
    manual_url = models.URLField(blank=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return f'{self.name}'
