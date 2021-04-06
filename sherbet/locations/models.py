from django.db import models

from sherbet.families.models import FamilyMixin
from sherbet.models import HistoryMixin


class Location(FamilyMixin, HistoryMixin):
    """
    TODO: non-US localication adjustments
    """
    address_1 = models.CharField(max_length=1024)
    address_2 = models.CharField(max_length=1024, blank=True)
    city = models.CharField(max_length=512)
    name = models.CharField(max_length=512)
    state = models.CharField(max_length=2)
    zip = models.IntegerField()

    def __str__(self):
        address = ', '.join(list(filter(None, [self.address_1, self.address_2])))
        return f'{self.name} ({address}, {self.city}, {self.state} {self.zip})'


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
