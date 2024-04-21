from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Conversation, Message
from .serializer import MessageSerializer

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        if not self.user.is_authenticated:
            self.close(code=4001)

        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        self.user = User.objects.get(id=5)
        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name,
        )

    def receive_json(self, content):
        channel_id = self.channel_id
        sender = self.user
        message = content["message"]
        conversation = Conversation.objects.get_or_create(channel_id=channel_id)[0]
        new_message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )
        serializer = MessageSerializer(new_message)

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "new_message": serializer.data,
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, closed_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.channel_id,
            self.channel_name,
        )
        super().disconnect(closed_code)
