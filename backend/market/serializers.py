from rest_framework import serializers
from market.models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductsInfoSerializer(serializers.ModelSerializer):
    prev_month_orders_qty = serializers.IntegerField(
        source="get_prev_month_orders_qty"
    )
    curr_month_orders_qty = serializers.IntegerField(
        source="get_curr_month_orders_qty"
    )
    categories = CategorySerializer(many=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "categories",
            "is_active",
            "price",
            "prev_month_orders_qty",
            "curr_month_orders_qty",
        )
