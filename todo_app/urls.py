from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls'), name="home"),
    path('admin/', admin.site.urls),
    path('api/', include('todo_api.urls')),
]
