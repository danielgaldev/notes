from rest_framework_nested import routers
from django.urls import path, include

from .views import SemesterViewSet, ClassViewSet, RequirementViewSet


router = routers.SimpleRouter()
router.register(r'semesters', SemesterViewSet, basename='semesters')
semester_router = routers.NestedSimpleRouter(router, r'semesters', lookup='semester')
semester_router.register(r'classes', ClassViewSet, base_name='semester-classes')
class_router = routers.NestedSimpleRouter(semester_router, r'classes', lookup='class')
class_router.register(r'requirements', RequirementViewSet, base_name='class-requirements')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(semester_router.urls)),
    path('', include(class_router.urls))
]
