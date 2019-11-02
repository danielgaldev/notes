from rest_framework import viewsets, permissions, generics, mixins, status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from . import models
from . import serializers


class SemesterAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.semesters.all().order_by('number')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_serializer_class(self):
        if (hasattr(self, 'action')):
            if self.action == 'retrieve':
                return serializers.SemesterDetailSerializer
        return serializers.SemesterSerializer
    

class ClassAPI(viewsets.ModelViewSet):
    queryset = models.Class.objects.all()
    serializer_class = serializers.ClassSerializer


class RequirementAPI(viewsets.ModelViewSet):
    queryset = models.Requirement.objects.all()
    serializer_class = serializers.RequirementSerializer


#########################
#         AUTH          #
#########################


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.LoginUserSerializer

    def get_object(self):
        return self.request.user


class RegisterAPI(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = serializers.RegisterUserSerializer


class LoginAPI(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': serializers.UserSerializer(user).data
        })


class LogoutAPI(generics.GenericAPIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
