# Generated by Django 3.0.6 on 2020-07-22 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0044_reviewcourse_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviewcourse',
            name='rating',
            field=models.IntegerField(default=0),
        ),
    ]