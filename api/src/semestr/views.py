from rest_framework import viewsets
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated 

from .models import Semester
from .serializers import SemesterSerializer, SemesterDetailSerializer


class SemesterViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self): 
        user = self.request.user 
        return Semester.objects.filter(user=user)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SemesterDetailSerializer
        return SemesterSerializer
