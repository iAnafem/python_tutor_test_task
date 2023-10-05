from logging import getLogger
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from knox.models import AuthToken
from users.serializers import UserSerializer


logger = getLogger(__name__)


def authenticate_by_password(email: str, password: str) -> dict:
    try:
        user = User.objects.get(email=email)
    except (User.DoesNotExist, AttributeError) as e:
        return {"error": "User with this email does not exist"}
    if check_password(password, user.password):
        if user.is_active:
            return {
                "user": UserSerializer(user).data,
                "token": AuthToken.objects.create(user)[1],
            }
        return {"error": "User with this email does not exist"}
    else:
        return {"error": "Incorrect password"}
