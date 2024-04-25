from account.serializer import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)
from django.conf import settings
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import Account
from .schema import account_list_docs
from .serializer import AccountSerializer


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        forbidden_usernames = ["admin", "root", "superuser"]
        username = request.data.get("username")
        password = request.data.get("password")
        if username in forbidden_usernames:
            raise ValidationError(detail="Username not allowed")
        try:
            user = Account.objects.create_user(username=username, password=password)
            user.save()
            return Response(
                {"detail: User successfully saved"},
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError:
            return Response(
                {"error: Username already exists"},
                status=status.HTTP_409_CONFLICT,
            )


class AccountViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    @account_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        user = get_object_or_404(Account, id=user_id)
        serializer = AccountSerializer(user)
        return Response(serializer.data)


class LogoutApiView(APIView):
    def get(self, request):
        response = Response("Successfully logged out")
        access_token = settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"]
        refresh_token = settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"]
        response.delete_cookie(access_token)
        response.delete_cookie(refresh_token)
        return response


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

        if response.data.get("access"):
            del response.data["access"]
        if response.data.get("refresh"):
            del response.data["refresh"]

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenObtainRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
