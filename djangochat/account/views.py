from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Account
from .schema import account_list_docs
from .serializer import AccountSerializer


# Create your views here.
class AccountViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    @account_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        user = get_object_or_404(Account, id=user_id)
        serializer = AccountSerializer(user)
        return Response(serializer.data)
