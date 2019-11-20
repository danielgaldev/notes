from rest_framework import viewsets, status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from .models import Semester, Class
from .serializers import SemesterSerializer, SemesterDetailSerializer, ClassSerializer


class SemesterViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self): 
        user = self.request.user 
        return Semester.objects.filter(user=user)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SemesterDetailSerializer
        return SemesterSerializer


class ClassViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
        
    def create(self, request, pk=None, semester_pk=None):
        name = request.data['name']
        user = request.user
        semester = get_object_or_404(Semester, user=user, pk=semester_pk)
        class_object = Class.objects.create(name=name, parent_semester=semester)
        return Response(ClassSerializer(class_object).data, status=status.HTTP_201_CREATED)
