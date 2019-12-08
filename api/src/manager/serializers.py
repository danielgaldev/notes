from rest_framework import serializers

from . import models


class RequirementTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementTemplate
        fields = ("id", "text")


class ClassTemplateSerializer(serializers.ModelSerializer):
    requirements = RequirementTemplateSerializer(many=True)
    class Meta:
        model = models.ClassTemplate
        fields = ("id", "name", "requirements")


class TemplateDetailSerializer(serializers.ModelSerializer):
    classes = ClassTemplateSerializer(many=True)
    class Meta:
        model = models.Template
        fields = ("id", "name", "classes")


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Template
        fields = ("id", "name")
