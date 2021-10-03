# Generated by Django 3.2.7 on 2021-10-03 05:13

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0002_auto_20211003_0429'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='ended_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='board',
            name='started_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]