from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import *


class UserView(APIView):
    queryset = CustomUser.objects.all()

    def get(self, request, *args, **kwargs):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


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
        return Response({"status": "Success"}, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        password = data["password"]

        try:
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({"status": "Success"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Error Authentication"}, status=status.HTTP_403_FORBIDDEN)
        except():
            return Response({"error": "Error in login"}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name="dispatch")
class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        password = data["password"]
        re_password = data["re_password"]

        try:
            if password == re_password:
                if CustomUser.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'}, status=status.HTTP_403_FORBIDDEN)
                else:
                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'},
                                        status=status.HTTP_403_FORBIDDEN)
                    else:
                        CustomUser.objects.create_user(username=username, password=password).save()
                        user = authenticate(username=username, password=password)
                        login(request, user)
                        return Response({'success': 'User created successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Passwords do not match'}, status=status.HTTP_403_FORBIDDEN)
        except():
            return Response({'error': 'Something went wrong when registering account'}, status=status.HTTP_403_FORBIDDEN)

    pass


# use this just for dev
@method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({"isAuthenticated": "success"}, status=status.HTTP_200_OK)
            else:
                return Response({"isAuthenticated": "error"}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"error": "Something went wrong when checking authentication status"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({"success": "CSRF cookie set"}, status=status.HTTP_200_OK)