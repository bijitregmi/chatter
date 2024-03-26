from django.db import models


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64)


class Sever(models.Model):
    pass
