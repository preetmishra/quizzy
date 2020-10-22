from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('teacher', views.TeacherViewSet)
router.register('course', views.CourseViewSet)
router.register('quiz', views.QuizViewSet)
router.register('question', views.QuestionViewSet)
router.register('answer', views.AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/teacher/', views.TeacherLoginApiView.as_view()),
]
