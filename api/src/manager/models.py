from django.db import models

class Template(models.Model):
    name = models.CharField(max_length=35)

class ClassTemplate(models.Model):
    name = models.CharField(max_length=35)
    parent_template = models.ForeignKey(Template, on_delete=models.CASCADE, related_name="classes")

class RequirementTemplate(models.Model):
    text = models.CharField(max_length=100)
    parent_class = models.ForeignKey(ClassTemplate, on_delete=models.CASCADE, related_name="requirements")
