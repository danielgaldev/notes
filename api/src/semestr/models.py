from django.db import models
from django.contrib.auth.models import User


class Semester(models.Model):
    number = models.IntegerField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Class(models.Model):
    name = models.CharField(max_length=50)
    parent_semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='classes')

class Requirement(models.Model):
    text = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
    parent_class = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='requirements')
