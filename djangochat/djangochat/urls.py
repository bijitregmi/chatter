from account.views import (
    AccountViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenObtainRefreshView,
    LogoutApiView,
    RegisterView,
)
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import CategoryListViewSet, ServerListViewSet, ServerMembershipViewset
from webchat.consumer import WebChatConsumer
from webchat.views import MessageViewSet

router = DefaultRouter()

# API routes
router.register("api/server/select", ServerListViewSet)
router.register("api/category/select", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="messages")
router.register("api/account", AccountViewSet, basename="user")
router.register(
    r"api/member/(?P<server_id>\d+)", ServerMembershipViewset, basename="member"
)


# Admin page and API schema routes
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui", SpectacularSwaggerView.as_view()),
    path(
        "api/token/",
        JWTCookieTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "api/token/refresh/",
        JWTCookieTokenObtainRefreshView.as_view(),
        name="token_refresh",
    ),
    path(
        "api/logout/",
        LogoutApiView.as_view(),
        name="logout",
    ),
    path(
        "api/register/",
        RegisterView.as_view(),
        name="register",
    ),
] + router.urls

# Websocket route
websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi()),
]

# Static and media files routes
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
