from django.contrib.auth import login, logout, authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import *


@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
class UserView(APIView):
    queryset = CustomUser.objects.all()

    def get(self, request, *args, **kwargs):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
class TaskView(APIView):
    queryset = Task.objects.all()

    def get(self, request, *args, **kwargs):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


class Logout(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        logout(request)
        return Response({'status': 'Success'}, status=200)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, form=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        try:
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                return Response({'status': 'Success'}, status=200)
            else:
                return Response({'error': 'Error Authentication'}, status=403)
        except:
            return Response({'error': 'Error in login'})
