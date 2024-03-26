from django.db import models
from account.models import Account


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(
        Account,
        on_delete=models.SET_NULL,
        related_name="server_owner",
        null=True,
    )
    catergory = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name="server_category", null=True
    )
    description = models.CharField(max_length=256, blank=True)
    member = models.ManyToManyField(Account, related_name="server_memeber", blank=True)

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(
        Account,
        on_delete=models.SET_NULL,
        related_name="channel_owner",
        null=True,
    )
    topic = models.CharField(max_length=64)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channel_server"
    )

    def __str__(self):
        return self.name
