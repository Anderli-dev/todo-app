from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import *


@api_view(['GET'])
def user_list(request):
    if request.method == 'GET':
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


@api_view(['GET'])
def task_list(request):
    if request.method == 'GET':
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)

        return Response(serializer.data)
