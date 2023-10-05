from rest_framework.generics import ListAPIView
from rest_framework import permissions
from market.models import Product
from market.serializers import ProductsInfoSerializer


class GetProductsInfoAPI(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductsInfoSerializer
