# Generated by Django 2.2.6 on 2020-03-03 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jhapp', '0001_initial'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['nikename'], name='name'),
        ),
        migrations.AlterModelTable(
            name='user',
            table='wechat_user',
        ),
    ]
