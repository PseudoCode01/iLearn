# Generated by Django 3.0.6 on 2020-07-20 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0038_hometutordemo'),
    ]

    operations = [
        migrations.AddField(
            model_name='hometutor',
            name='unlocked',
            field=models.IntegerField(default=1),
        ),
    ]