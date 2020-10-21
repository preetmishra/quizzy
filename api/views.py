from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.response import Response

from . import models, serializers


class TeacherViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TeacherSerializer
    queryset = models.Teacher.objects.all()

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.user.is_active = False
            instance.user.save()
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)
