from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db import IntegrityError
from users.serializers import (
    CreateUserSerializer,
    LoginSerializer,
    AuthenticatedUserSerializer,
)
from users.services.main import authenticate_by_password
from logging import getLogger

logger = getLogger(__name__)


class LoginWithPassAPI(generics.GenericAPIView):
    """Login with password generic API view"""

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        data = authenticate_by_password(
            email=self.request.data.get("email"),
            password=self.request.data.get("password"),
        )

        if "user" in data:
            serializer = AuthenticatedUserSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


class SignUpAPI(generics.GenericAPIView):
    """Sign UP  with email and password API"""

    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        try:
            User.objects.create_user(**self.request.data)
        except IntegrityError:
            return Response(
                "Something went wrong",
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            "User successfully registered", status=status.HTTP_201_CREATED
        )
