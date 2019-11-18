from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers, status, viewsets, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class Item(models.Model):
    text = models.TextField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("id", "text")


class ItemViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Item.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        text = request.data["text"]
        item = Item.objects.create(text=text, user=self.request.user)
        serializer = self.get_serializer(item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
