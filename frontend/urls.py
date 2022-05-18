from django.urls import path

from frontend import views

app_name = 'frontend'

urlpatterns = [
    path('', views.home, name="home"),
    path('login', views.home, name="login"),
    path('register', views.home, name="register"),
    path('task/create', views.home, name="create"),
    path('task/<int:id>', views.home, name="task"),
]