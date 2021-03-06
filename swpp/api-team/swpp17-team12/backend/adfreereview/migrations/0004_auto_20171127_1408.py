# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-27 14:08
from __future__ import unicode_literals

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adfreereview', '0003_auto_20171122_1418'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='score',
        ),
        migrations.AddField(
            model_name='post',
            name='adfree_score',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=5),
        ),
        migrations.AddField(
            model_name='post',
            name='content_score',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=5),
        ),
        migrations.AddField(
            model_name='post',
            name='rating_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='post',
            name='total_score',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=5),
        ),
    ]
