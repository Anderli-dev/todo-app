from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Task


class TaskInline(admin.TabularInline):
    model = Task


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    class Meta:
        model = CustomUser
        fields = '__all__'


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    class Meta:
        model = Task
    list_display = ['title',]