# Generated by Django 4.1.4 on 2022-12-11 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_contact_address_alter_contact_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
    ]
