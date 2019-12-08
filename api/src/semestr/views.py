from rest_framework import viewsets, status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, DestroyModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from .models import Semester, Class, Requirement
from .serializers import SemesterSerializer, SemesterDetailSerializer, ClassSerializer, RequirementSerializer
from manager.models import Template


class SemesterViewSet(ListModelMixin, RetrieveModelMixin, DestroyModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self): 
        return Semester.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SemesterDetailSerializer
        return SemesterSerializer

    def create(self, request):
        number = request.data['number']
        semester = Semester.objects.create(number=number, user=request.user)
        return Response(SemesterSerializer(semester).data, status=status.HTTP_201_CREATED)


class ClassViewSet(DestroyModelMixin, viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
        
    def create(self, request, pk=None, semester_pk=None):
        name = request.data['name']
        user = request.user
        semester = get_object_or_404(Semester, user=user, pk=semester_pk)
        class_object = Class.objects.create(name=name, parent_semester=semester)
        return Response(ClassSerializer(class_object).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None, semester_pk=None):
        user = request.user
        queryset = Class.objects.filter(parent_semester=semester_pk, parent_semester__user=user)
        obj = get_object_or_404(queryset, pk=pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['post'], url_path='from')
    def from_template(self, request, semester_pk=None):
        template_id = request.data['templateId']
        template = get_object_or_404(Template, pk=template_id)
        parent_semester = get_object_or_404(Semester, pk=semester_pk)
        for template_class in template.classes.all():
            class_object = Class.objects.create(name=template_class.name, parent_semester=parent_semester)
            for template_req in template_class.requirements.all():
                Requirement.objects.create(text=template_req.text, parent_class=class_object)
        return Response(status=status.HTTP_201_CREATED)


class RequirementViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
        
    def create(self, request, pk=None, semester_pk=None, class_pk=None):
        text = request.data['text']
        class_object = get_object_or_404(
            Class, 
            parent_semester=semester_pk, 
            parent_semester__user=request.user, 
            pk=class_pk
        )
        requirement = Requirement.objects.create(text=text, parent_class=class_object, done=False)
        return Response(RequirementSerializer(requirement).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None, semester_pk=None, class_pk=None):
        queryset = Requirement.objects.filter(
            parent_class=class_pk, 
            parent_class__parent_semester=semester_pk,
            parent_class__parent_semester__user=request.user
        )
        obj = get_object_or_404(queryset, pk=pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None, semester_pk=None, class_pk=None):
        requirement = get_object_or_404(
            Requirement,
            pk=pk,
            parent_class=class_pk,
            parent_class__parent_semester=semester_pk,
            parent_class__parent_semester__user=request.user
        )
        requirement.done = not requirement.done
        requirement.save()
        return Response(status=status.HTTP_200_OK)
