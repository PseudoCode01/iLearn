# Generated by Django 3.0.6 on 2020-10-26 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0093_megaquiz'),
    ]

    operations = [
        migrations.AddField(
            model_name='megaquiz',
            name='winner3name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]