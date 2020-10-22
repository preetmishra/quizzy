from django.http import Http404
from django.db.utils import IntegrityError
from rest_framework import generics, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from . import models, permissions, serializers


class TeacherViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TeacherSerializer
    queryset = models.Teacher.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateTeacherAccount,)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.user.is_active = False
            instance.user.save()
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)


class TeacherLoginApiView(ObtainAuthToken):
    """
    Handles creating Teacher authentication tokens.
    """

    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class UserTokenApiView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CourseSerializer
    queryset = models.Course.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateCourse, IsAuthenticated)

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user.teacher)


class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.QuizSerializer
    queryset = models.Quiz.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateQuiz, IsAuthenticated)

    def create(self, request):
        try:
            return super().create(request)
        except IntegrityError as e:
            raise ParseError('A quiz with this course ID already exists.')


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.QuestionSerializer
    queryset = models.Question.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateQuestion, IsAuthenticated)


class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AnswerSerializer
    queryset = models.Answer.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateAnswer, IsAuthenticated)


class CorrectAnswerViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CorrectAnswerSerializer
    queryset = models.CorrectAnswer.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateCorrectAnswer, IsAuthenticated)
