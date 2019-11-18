from rest_framework.test import APITestCase
from rest_framework import status


class TestCase(APITestCase):

    def test_get_items(self):
        response = self.client.get("/api/v1/items/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
