from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    pass


class Task(models.Model):
    title = models.CharField(max_length=255, unique=False)
    description = models.TextField("Task text")
    created_at = models.DateTimeField(auto_now_add=True)

    author_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
