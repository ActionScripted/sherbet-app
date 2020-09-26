# Generated by Django 3.1.1 on 2020-09-26 20:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('assets', '0002_asset_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='user_created',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asset_user_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='asset',
            name='user_modified',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asset_user_modified', to=settings.AUTH_USER_MODEL),
        ),
    ]
