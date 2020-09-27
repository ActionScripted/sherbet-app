from django.contrib.auth.models import AbstractUser
from django.db import models # noqa

from sherbet.models import FamilyMixin


class User(AbstractUser, FamilyMixin):
    pass
