from django.urls import path
from .views import UserView, TaskView

urlpatterns = [
    path('user/', UserView.as_view()),
    path('task/', TaskView.as_view()),
]