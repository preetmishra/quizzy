from django.contrib import admin

from . import models


admin.site.register(models.User)
admin.site.register(models.Teacher)
admin.site.register(models.Course)
admin.site.register(models.Quiz)
admin.site.register(models.Question)
admin.site.register(models.Answer)
admin.site.register(models.CorrectAnswer)
admin.site.register(models.Student)
