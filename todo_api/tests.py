from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from todo_api.models import Task, CustomUser


class AuthenticationTestCase(APITestCase):
    def test_register(self):
        data = {"username": "test", "password": "123456", "re_password": "123456"}
        url = reverse('register')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_fail_register(self):
        self.test_register()
        data = {"username": "test", "password": "123456", "re_password": "123456"}
        url = reverse('register')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        data = {"username": "test", "password": "12345", "re_password": "123456"}
        url = reverse('register')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        data = {"username": "test", "password": "123456", "re_password": "654321"}
        url = reverse('register')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_login(self):
        self.test_register()
        data = {"username": "test", "password": "123456"}
        url = reverse('login')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_fail_login(self):
        self.test_register()
        data = {"username": "test", "password": ""}
        url = reverse('login')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        data = {"username": "", "password": "12345"}
        url = reverse('login')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TaskTestCase(APITestCase):
    def crete_user_and_task(self):
        CustomUser.objects.create_user(username="test", password="123456")
        user = CustomUser.objects.get(id=1)
        self.client.login(username="test", password="123456")

        task = Task.objects.create(title="Test title", description="Test text", author_id=user)
        task.save()

    def test_tasks(self):
        CustomUser.objects.create_user(username="test", password="123456")
        self.client.login(username="test", password="123456")

        url = reverse('tasks')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_fail_task(self):
        url = reverse('tasks')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_task(self):
        CustomUser.objects.create_user(username="test", password="123456")
        self.client.login(username="test", password="123456")

        url = reverse('create_task')
        data = {"title": "Test title", "description": "Test text"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_task_detail(self):
        self.crete_user_and_task()

        url = reverse('task', kwargs={'id': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_task_delete(self):
        self.crete_user_and_task()

        url = reverse('delete_task', kwargs={'id': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_set_status_task(self):
        self.crete_user_and_task()

        data = {"task_status": "done"}

        url = reverse('task_status', kwargs={'id': 1})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
