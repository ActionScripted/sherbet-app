from django.contrib import admin

from sherbet.comments.admin import CommentStackedInline


class AssetAdmin(admin.ModelAdmin):
    inlines = [CommentStackedInline]
