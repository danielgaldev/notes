from django.db import models
from django.contrib.auth.models import User

class Semester(models.Model):
    number = models.IntegerField()
    owner = models.ForeignKey(
        User, related_name='semesters', on_delete=models.CASCADE)

    def __str__(self):
        return ''.join([str(self.number), '. semester'])
    

class Class(models.Model):
    name = models.TextField(max_length=50)
    credit = models.IntegerField()
    parent_semester = models.ForeignKey(
        Semester, related_name='classes', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Requirement(models.Model):
    name = models.TextField()
    due = models.DateField(auto_now_add=False)
    parent_class = models.ForeignKey(
        Class, related_name='requirements', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
