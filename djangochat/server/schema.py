from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import ChannelSerializer, ServerSerializers

server_list_docs = extend_schema(
    responses=ServerSerializers(many=True),
    parameters=[
        OpenApiParameter(
            name="category",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Server list by category name",
        ),
        OpenApiParameter(
            name="qty",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Quantity of severs required in INT",
        ),
        OpenApiParameter(
            name="by_user",
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="Filter servers by current user",
        ),
        OpenApiParameter(
            name="server_id",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="A single server by ID",
        ),
    ],
)
