from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
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


class Course(models.Model):
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name="courses",
        related_query_name="course",
    )
    name = models.CharField(
        max_length=128,
        verbose_name='Course Name',
        unique=True,
    )

    def __str__(self):
        return self.name


class Quiz(models.Model):
    course = models.OneToOneField(
        Course,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='quizzes'
    )
    name = models.CharField(
        max_length=128,
        verbose_name='Quiz Name',
        unique=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Quizzes'


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions",
        related_query_name="question",
    )
    desc = models.CharField(
        max_length=255,
        verbose_name='Description',
        unique=True,
    )
    points = models.PositiveSmallIntegerField(
        default=1,
        validators=[MaxValueValidator(10), MinValueValidator(1)],
        help_text='Sets points for a question. A positive integer with maximum'
                  ' value of 10.',
    )

    def __str__(self):
        return self.desc
