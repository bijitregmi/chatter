from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

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


class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            {
                response.set_cookie(
                    settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                    response.data["refresh"],
                    max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                    httponly=True,
                    samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
                )
            }
        if response.data.get("access"):
            {
                response.set_cookie(
                    settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                    response.data["access"],
                    max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                    httponly=True,
                    samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
                )
            }

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    pass
