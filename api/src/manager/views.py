from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

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

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class ClassTemplateViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
        
    def create(self, request, pk=None, template_pk=None):
        name = request.data['name']
        template = get_object_or_404(models.Template, pk=template_pk)
        class_object = models.ClassTemplate.objects.create(name=name, parent_template=template)
        return Response(serializers.ClassTemplateSerializer(class_object).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None, template_pk=None):
        queryset = models.ClassTemplate.objects.filter(parent_template=template_pk)
        obj = get_object_or_404(queryset, pk=pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RequirementTemplateViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
        
    def create(self, request, pk=None, template_pk=None, class_pk=None):
        text = request.data['text']
        class_object = get_object_or_404(models.ClassTemplate, parent_template=template_pk, pk=class_pk)
        requirement = models.RequirementTemplate.objects.create(text=text, parent_class=class_object)
        print(serializers.RequirementTemplateSerializer(requirement).data)
        return Response(serializers.RequirementTemplateSerializer(requirement).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None, template_pk=None, class_pk=None):
        queryset = models.RequirementTemplate.objects.filter(parent_class=class_pk, parent_class__parent_template=template_pk)
        obj = get_object_or_404(queryset, pk=pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
