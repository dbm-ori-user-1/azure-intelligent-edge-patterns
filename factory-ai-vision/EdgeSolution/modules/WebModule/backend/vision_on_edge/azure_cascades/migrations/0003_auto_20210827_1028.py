# Generated by Django 3.0.8 on 2021-08-27 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('azure_cascades', '0002_cascade_screenshot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cascade',
            name='screenshot',
            field=models.CharField(blank=True, default='', max_length=1000000, null=True),
        ),
    ]
