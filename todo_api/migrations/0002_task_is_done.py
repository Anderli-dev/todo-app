# Generated by Django 4.0.1 on 2022-05-10 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='is_done',
            field=models.BooleanField(default=False),
        ),
    ]
