from rest_framework.generics import ListAPIView
from market.models import Product
from market.serializers import ProductsInfoSerializer


class GetProductsInfoAPI(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsInfoSerializer
