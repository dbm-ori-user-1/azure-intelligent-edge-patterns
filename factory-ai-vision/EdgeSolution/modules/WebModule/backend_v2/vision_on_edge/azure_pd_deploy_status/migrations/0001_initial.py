# Generated by Django 3.0.8 on 2020-08-26 06:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('azure_projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrainingStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=200)),
                ('log', models.CharField(max_length=1000)),
                ('performance', models.CharField(default='{}', max_length=2000)),
                ('need_to_send_notification', models.BooleanField(default=False)),
                ('project', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='azure_projects.Project')),
            ],
        ),
    ]
