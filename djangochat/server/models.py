from account.models import Account
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from .validators import (
    validate_icon_image_size,
    validate_image_file_extension,
    validate_svg_file_extension,
)


# Create your models here.
def category_icon_upload_path(instance, filename):
    return f"category/{instance.id}/icon/{filename}"


def server_banner_upload_path(instance, filename):
    return f"server/{instance.id}/banner/{filename}"


def server_icon_upload_path(instance, filename):
    return f"server/{instance.id}/icon/{filename}"


class Category(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    icon = models.FileField(
        upload_to=category_icon_upload_path,
        blank=True,
        null=True,
        validators=[validate_svg_file_extension],
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.id:
            exists = get_object_or_404(Category, id=self.id)
            if exists.icon != self.icon:
                exists.icon.delete(save=False)
            self.name = self.name.lower()
            super(Category, self).save(*args, **kwargs)

        else:
            saved_image = self.icon
            self.icon = None
            super(Category, self).save(*args, **kwargs)
            self.icon = saved_image
            self.save()

    @receiver(models.signals.pre_delete, sender="server.Category")
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)


class Server(models.Model):
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(
        Account,
        on_delete=models.SET_NULL,
        related_name="server_owner",
        null=True,
    )
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name="server_category", null=True
    )
    description = models.CharField(max_length=256, blank=True)
    member = models.ManyToManyField(Account, related_name="server_member", blank=True)
    banner = models.ImageField(
        upload_to=server_banner_upload_path,
        blank=True,
        null=True,
        validators=[validate_image_file_extension],
    )
    icon = models.ImageField(
        upload_to=server_icon_upload_path,
        blank=True,
        null=True,
        validators=[validate_icon_image_size, validate_image_file_extension],
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.id:
            exists = get_object_or_404(Server, id=self.id)
            if exists.icon != self.icon:
                exists.icon.delete(save=False)
            if exists.banner != self.banner:
                exists.banner.delete(save=False)
            super(Server, self).save(*args, **kwargs)
        else:
            saved_icon = self.icon
            saved_banner = self.banner
            self.icon = None
            self.banner = None
            super(Server, self).save(*args, **kwargs)
            self.icon = saved_icon
            self.banner = saved_banner
            self.save()

    @receiver(models.signals.pre_delete, sender="server.Server")
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon" or field.name == "banner":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)


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
