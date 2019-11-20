from rest_framework_nested import routers
from django.urls import path, include

from .views import SemesterViewSet, ClassViewSet


router = routers.SimpleRouter()
router.register(r'semesters', SemesterViewSet, basename='semesters')
semester_router = routers.NestedSimpleRouter(router, r'semesters', lookup='semester')
semester_router.register(r'classes', ClassViewSet, base_name='semester-classes')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(semester_router.urls))
]
