from django.db import models

from sherbet.models import HistoryMixin


class Family(HistoryMixin):
    name = models.CharField(max_length=512)

    class Meta:
        verbose_name_plural = 'families'

    def __str__(self):
        return f'{self.name}'


class FamilyMixin(models.Model):
    """
    Todo:
        * Might make sense to make "family" field required, non-null.
    """
    family = models.ForeignKey(
        'families.family',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='%(class)s_family',
    )

    class Meta:
        abstract = True
