from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('semestr.urls')),
    path('api/v1/', include('account.urls')),
    path('api/v1/', include('manager.urls')),    
]
