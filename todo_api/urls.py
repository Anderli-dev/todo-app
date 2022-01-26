from django.urls import path

from .views import LoginView, UserView, TaskView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserView.as_view()),
    path('tasks/', TaskView.as_view()),
]