# Generated by Django 2.2.4 on 2019-08-22 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ment_app', '0006_auto_20190816_1628'),
    ]

    operations = [
        migrations.AddField(
            model_name='career',
            name='image',
            field=models.CharField(default='', max_length=500),
        ),
    ]