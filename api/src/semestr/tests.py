from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from .models import Semester


class SemestrTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="den", password="denpass")

    def test_get_items(self):
        request_data = { "number": 1 }
        self.client.force_login(self.user)

        response = self.client.post("/api/v1/semesters/", request_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Semester.objects.all().count(), 1)
        self.assertEqual(Semester.objects.all()[0].number, 1)

        self.client.logout()
