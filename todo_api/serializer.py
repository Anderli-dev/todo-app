from pyexpat import model

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from .models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username',)


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('title', 'id', 'description', 'created_at', 'is_done')
