from django.urls import path

from .views import (LoginView,
                    UserView,
                    TaskView,
                    Logout,
                    GetCSRFToken,
                    CheckAuthenticatedView,
                    RegisterView,)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('users/', UserView.as_view(), name='users'),
    path('tasks/', TaskView.as_view(), name='tasks'),
    path('register/', RegisterView.as_view(), name='register'),
    path('csrf_cookie/', GetCSRFToken.as_view()),
    path('authenticated/', CheckAuthenticatedView.as_view()),
]