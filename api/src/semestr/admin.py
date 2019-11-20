from django.contrib import admin

from . import models

admin.site.register(models.Semester)
admin.site.register(models.Class)
admin.site.register(models.Requirement)
