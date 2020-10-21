from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
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
