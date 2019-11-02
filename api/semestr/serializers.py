from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Semester, Class, Requirement


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = '__all__'


class ClassSerializer(serializers.ModelSerializer):
    requirements = RequirementSerializer(many=True)
    
    class Meta:
        model = Class
        fields = '__all__'


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('number', 'id')


class SemesterDetailSerializer(serializers.ModelSerializer):
    classes = ClassSerializer(many=True)

    class Meta:
        model = Semester
        fields = '__all__'


#########################
#         AUTH          #
#########################


class RegisterUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ( "id", "username", "password", )


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Unable to log in with provided credentials."
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )
