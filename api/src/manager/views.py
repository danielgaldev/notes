from rest_framework import viewsets, mixins

from . import models
from . import serializers


class TemplateViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = models.Template.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return serializers.TemplateDetailSerializer
        return serializers.TemplateSerializer
