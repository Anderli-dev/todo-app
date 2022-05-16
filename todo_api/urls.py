from django.urls import path

from .views import (LoginView,
                    TaskView,
                    Logout,
                    GetCSRFToken,
                    CheckAuthenticatedView,
                    RegisterView,
                    TaskCreateView,
                    TaskDetailView,
                    TaskDeleteView,
                    TaskStatusView,)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('tasks/', TaskView.as_view(), name='tasks'),
    path('task/<int:id>', TaskDetailView.as_view(), name='task'),
    path('task/<int:id>/delete', TaskDeleteView.as_view(), name='task_delete'),
    path('task/<int:id>/set_task_status', TaskStatusView.as_view(), name='task_status'),
    path('task/create/', TaskCreateView.as_view(), name='create_task'),
    path('register/', RegisterView.as_view(), name='register'),
    path('csrf_cookie/', GetCSRFToken.as_view()),
    path('authenticated/', CheckAuthenticatedView.as_view()),
]