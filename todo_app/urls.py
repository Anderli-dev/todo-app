from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import static

from todo_app import settings

urlpatterns = [
    path('', include('frontend.urls'), name="home"),
    path('admin/', admin.site.urls),
    path('api/', include('todo_api.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)