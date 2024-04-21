import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser


@database_sync_to_async
def get_user(scope):
    model = get_user_model()
    try:
        token = scope["token"]
        if token:
            user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])[
                "user_id"
            ]
            return model.objects.get(id=user_id)
        else:
            return AnonymousUser()
    except (model.DoesNotExist, jwt.exceptions.DecodeError, KeyError):
        return AnonymousUser()


class JWTAuthMiddelware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, recieve, send):
        headers_dict = dict(scope["headers"])
        cookie_str = headers_dict.get(b"cookie", b"").decode()
        if cookie_str:
            cookies = {
                cookie.split("=")[0]: cookie.split("=")[1]
                for cookie in cookie_str.split("; ")
            }
            print(cookies)
            access_token = cookies.get("access_token")

            scope["token"] = access_token
        scope["user"] = await get_user(scope)

        return await self.app(scope, recieve, send)
