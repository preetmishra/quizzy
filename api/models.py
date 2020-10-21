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
