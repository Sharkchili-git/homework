# Generated by Django 2.2.6 on 2020-03-03 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('openid', models.CharField(max_length=64, unique=True)),
                ('nikename', models.CharField(max_length=64)),
                ('focus_cities', models.TextField(default='[]')),
                ('focus_constellations', models.TextField(default='[]')),
                ('focus_stocks', models.TextField(default='[]')),
            ],
        ),
    ]
