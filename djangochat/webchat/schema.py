from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializer import MessageSerializer

message_list_docs = extend_schema(
    responses=MessageSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="channel_id",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="ID of the channel",
        )
    ],
)
