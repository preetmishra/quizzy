# Generated by Django 3.1.2 on 2020-10-21 22:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_correctanswer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='correctanswer',
            name='correct_option',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='correct_answer', to='api.answer'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='course',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='quiz', serialize=False, to='api.course'),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='teacher', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
