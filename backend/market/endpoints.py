from django.urls import path
from market.api import GetProductsInfoAPI

urlpatterns = [path("products-info/", GetProductsInfoAPI.as_view())]
