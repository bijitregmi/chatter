from django.contrib import admin

from .models import Category, Channel, Server


class ServerAdmin(admin.ModelAdmin):
    filter_horizontal = ("member",)


# Register your models here.
admin.site.register(Channel)
admin.site.register(Server, ServerAdmin)
admin.site.register(Category)
