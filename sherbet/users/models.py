from django.contrib.auth.models import AbstractUser
from django.db import models # noqa

from sherbet.families.models import FamilyMixin


class User(FamilyMixin, AbstractUser):
    pass
