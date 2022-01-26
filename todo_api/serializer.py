from pyexpat import model

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from .models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'id', 'password')


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('title', 'id', 'description', 'created_at', 'author_id')


class LoginSerializer(Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']