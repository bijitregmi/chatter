from django.db.models import Count
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ParseError, ValidationError
from rest_framework.response import Response

from .models import Category, Server
from .schema import server_list_docs
from .serializers import CategorySerializer, ServerSerializers


class CategoryListViewSet(viewsets.ViewSet):

    queryset = Category.objects.all()

    @extend_schema(responses=CategorySerializer(many=True))
    def list(self, request):
        self.queryset = self.queryset.order_by("name")
        serialzer = CategorySerializer(self.queryset, many=True)
        return Response(serialzer.data)


# Create your views here.
class ServerListViewSet(viewsets.ViewSet):

    # Get queryset
    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """
        Retrieves and filters the list of servers based on request parameters.


        Args:
            request (HttpRequest): The HTTP request object containing query parameters for filtering the server list.

            - category (str, optional): The category name by which to filter the servers.
            - qty (int, optional): The maximum number of servers to retrieve.
            - by_user (str, optional): Indicates whether to filter servers by the current user. Valid values are "true" or "false".
            - server_id (int, optional): The ID of the specific server to retrieve.

        Returns:
            Response: Response object containing serialized data of filtered servers.

        Raises:
            AuthenticationFailed: If the user is not authenticated.
            ParseError: If an invalid value is provided for the 'by_user' parameter.
            ValidationError: If the provided server ID does not exist or is not a number.
        """

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user")
        server_id = request.query_params.get("server_id")

        # if not request.user.is_authenticated:
        #     raise AuthenticationFailed()

        # Filter by categories
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filter by current user
        if by_user:
            if by_user == "true":
                self.queryset = self.queryset.filter(member=request.user)
            else:
                raise ParseError(f"Invalid by_user:{by_user} value")

        # Filter by server id
        if server_id:
            try:
                int(server_id)
                self.queryset = self.queryset.filter(id=server_id)
                if not self.queryset:
                    raise ValidationError(
                        detail=f"Server with id:{server_id} does not exist"
                    )
            except ValueError:
                raise ValidationError(
                    detail=f"Server with id:{server_id} does not exist and must be a number"
                )

        # Filter by quantity
        if qty:
            self.queryset = self.queryset[: int(qty)]

        self.queryset = self.queryset.order_by("name")
        serializer = ServerSerializers(self.queryset, many=True)
        return Response(serializer.data)
