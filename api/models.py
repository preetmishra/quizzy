from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    A subclass to AbstractUser class for extra fields.
    """

    is_teacher = models.BooleanField(
        default=False,
        verbose_name='Teacher status',
        help_text='Designates whether this user should be treated as a '
                  'teacher.',
    )
    is_student = models.BooleanField(
        default=False,
        verbose_name='Student status',
        help_text='Designates whether this user should be treated as a '
                  'student.',
    )


class Teacher(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='teachers'
    )

    def __str__(self):
        return self.user.username
