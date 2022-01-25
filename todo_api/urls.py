from django.template.defaulttags import url
from django.urls import path
from .views import user_list, task_list

urlpatterns = [
    path('users/', user_list),
    path('tasks/', task_list),
]