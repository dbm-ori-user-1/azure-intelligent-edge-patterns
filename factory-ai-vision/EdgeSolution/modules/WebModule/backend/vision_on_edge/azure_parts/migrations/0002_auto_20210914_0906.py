# Generated by Django 3.0.8 on 2021-09-14 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('azure_parts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='part',
            name='local_image_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='part',
            name='remote_image_count',
            field=models.IntegerField(default=0),
        ),
    ]