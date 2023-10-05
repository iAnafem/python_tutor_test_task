from django.urls import path, include
from users.api import LoginWithPassAPI, SignUpAPI


urlpatterns = [
    path("login/", LoginWithPassAPI.as_view()),
    path("sign-up/", SignUpAPI.as_view()),
]
