from rest_framework import generics

from .models import CustomUser, Task
from .serializer import UserSerializer, TaskSerializer


class UserView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class TaskView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
