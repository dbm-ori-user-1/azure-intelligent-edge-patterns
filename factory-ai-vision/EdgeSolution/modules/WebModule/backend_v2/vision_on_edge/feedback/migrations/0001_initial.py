# Generated by Django 3.0.8 on 2020-09-01 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('satisfaction', models.CharField(choices=[('EX', 'Excellent'), ('GD', 'Good'), ('FR', 'Fair'), ('PR', 'Poor'), ('VB', 'Very Bad')], default='FR', max_length=2)),
            ],
        ),
    ]
