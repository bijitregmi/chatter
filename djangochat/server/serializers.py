from rest_framework import serializers

from .models import Category, Channel, Server


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializers(serializers.ModelSerializer):

    channel_server = ChannelSerializer(many=True)

    class Meta:
        model = Server
        fields = "__all__"
        depth = 1


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"
