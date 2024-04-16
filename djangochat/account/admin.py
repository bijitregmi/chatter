from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Account, UserAdmin)
