from django.db import models
from djmoney.models.fields import MoneyField


from sherbet.models import CommentsMixin
from sherbet.models import FamilyMixin
from sherbet.models import HistoryMixin
from sherbet.models import LocationMixin


class Asset(CommentsMixin, FamilyMixin, HistoryMixin, LocationMixin):
    cost = MoneyField(
        decimal_places=2,
        default_currency='USD',
        max_digits=14, )
    manual_url = models.URLField(blank=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return f'{self.name}'
