from rest_framework.routers import DefaultRouter
from django.urls import path

from .item import ItemViewSet
from . import auth

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='items')

urlpatterns = [
    path("login/", auth.login_view),
    path("logout/", auth.logout_view),
    path("register/", auth.register_view),
    path("me/", auth.account)
] + router.urls
