# Generated by Django 3.2.7 on 2021-10-03 04:29

import boards.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='boxes_opened',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='board',
            name='mines_amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='board',
            name='status',
            field=models.IntegerField(choices=[(boards.models.BoardStatus['ACTIVE'], 'Active'), (boards.models.BoardStatus['WON'], 'Won'), (boards.models.BoardStatus['LOST'], 'Lost')], default=boards.models.BoardStatus['ACTIVE']),
        ),
    ]