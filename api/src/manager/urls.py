from rest_framework_nested import routers
from django.urls import path, include

from .views import TemplateViewSet, ClassTemplateViewSet, RequirementTemplateViewSet


router = routers.SimpleRouter()
router.register(r'templates', TemplateViewSet, basename='templates')
template_router = routers.NestedSimpleRouter(router, r'templates', lookup='template')
template_router.register(r'classes', ClassTemplateViewSet, base_name='template-classes')
class_router = routers.NestedSimpleRouter(template_router, r'classes', lookup='class')
class_router.register(r'requirements', RequirementTemplateViewSet, base_name='class-requirements')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(template_router.urls)),
    path('', include(class_router.urls))
]
