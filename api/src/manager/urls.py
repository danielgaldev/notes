from rest_framework_nested import routers
from django.urls import path, include

from . import views


router = routers.SimpleRouter()
router.register(r'templates', views.TemplateViewSet, basename='templates')


urlpatterns = [
    path('', include(router.urls))
]
