from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "first_name", "last_name")


class AuthenticatedUserSerializer(serializers.Serializer):
    user = UserSerializer()
    token = serializers.CharField(required=False)


class LoginSerializer(serializers.Serializer):
    user = UserSerializer()
    password = serializers.CharField(max_length=100)


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password", "username", "first_name", "last_name")
