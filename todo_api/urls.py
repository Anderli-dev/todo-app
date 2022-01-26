from django.urls import path

from .views import LoginView, UserView, TaskView, Logout

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('users/', UserView.as_view(), name='users'),
    path('tasks/', TaskView.as_view(), name='tasks'),
]