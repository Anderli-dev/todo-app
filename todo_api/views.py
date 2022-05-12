from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions
from rest_framework import status
from rest_framework.generics import (ListAPIView,
                                     CreateAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     UpdateAPIView,
                                     get_object_or_404)
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import *


class UserView(APIView):
    # TODO add user in NavBar
    queryset = CustomUser.objects.all()

    def get(self, request, *args, **kwargs):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class TaskView(ListAPIView):
    # add is_auth
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.filter(author_id=self.request.user.id)
        return queryset


@method_decorator(csrf_protect, name="dispatch")
class TaskDetailView(RetrieveUpdateAPIView):
    serializer_class = TaskSerializer

    def get_object(self):
        id = self.kwargs["id"]
        return get_object_or_404(Task, author_id=self.request.user, id=id)


@method_decorator(csrf_protect, name="dispatch")
class TaskCreateView(CreateAPIView):
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        return serializer.save(author_id=self.request.user)


class TaskDeleteView(DestroyAPIView):
    serializer_class = TaskSerializer

    def get_object(self):
        id = self.kwargs["id"]
        return get_object_or_404(Task, author_id=self.request.user, id=id)


class TaskDoneView(UpdateAPIView):
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        id = self.kwargs["id"]
        task = Task.objects.filter(author_id=self.request.user, id=id)
        task.update(is_done=True)

        return Response({"msg": "Task is done"}, status=status.HTTP_200_OK)


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