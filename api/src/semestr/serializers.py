from rest_framework import serializers

from .models import Semester, Class, Requirement

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ('id', 'text', 'done')


class ClassSerializer(serializers.ModelSerializer):
    requirements = RequirementSerializer(many=True)

    class Meta:
        model = Class
        fields = ('id', 'name', 'requirements')


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('id', 'number')


class SemesterDetailSerializer(serializers.ModelSerializer):
    classes = ClassSerializer(many=True)
    
    class Meta:
        model = Semester
        fields = ('id', 'number', 'classes')
        