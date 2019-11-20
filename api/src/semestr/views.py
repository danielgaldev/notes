from rest_framework import viewsets
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated 

from .models import Semester
from .serializers import SemesterSerializer


class SemesterViewSet(ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SemesterSerializer
    
    def get_queryset(self): 
        user = self.request.user 
        return Semester.objects.filter(user=user)
