from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Conversation, Message
from .schema import message_list_docs
from .serializer import MessageSerializer

# Create your views here.


class MessageViewSet(viewsets.ViewSet):

    @message_list_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            message = conversation.message.all().order_by("created_at")
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])
