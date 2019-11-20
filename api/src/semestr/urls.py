from rest_framework_nested import routers
from django.urls import path, include

from .views import SemesterViewSet


router = routers.SimpleRouter()
router.register(r'semesters', SemesterViewSet, basename='semesters')

urlpatterns = [
    path('', include(router.urls))
]
