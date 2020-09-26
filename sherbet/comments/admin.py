from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline

from sherbet.comments.models import Comment


class CommentStackedInline(GenericStackedInline):
    model = Comment
    extra = 0
