from django.db import models
from rest_framework import serializers        
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import mixins


class Item(models.Model):
    text = models.TextField(max_length=100)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ItemViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
