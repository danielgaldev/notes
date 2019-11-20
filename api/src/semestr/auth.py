from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view

from .serializers import UserSerializer


@api_view(["POST"])
def login_view(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)
    if user is None:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    login(request, user)
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)
    

@api_view(["POST"])
def register_view(request):
    username = request.data["username"]
    password = request.data["password"]
    User.objects.create_user(username=username, password=password)
    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
def account(request):
    if request.user is not None and not request.user.is_anonymous:
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
