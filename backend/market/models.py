from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class TimestampsMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimestampsMixin):
    """This model stores data about categories of products"""

    name = models.CharField(max_length=200, unique=True)

    def __str__(self) -> str:
        return str(self.name)

    def __repr__(self) -> str:
        return self.__str__()


class Customer(TimestampsMixin):
    """This model stores data about customers of our market"""

    email = models.EmailField()
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)

    def get_full_name(self) -> str:
        full_name = self.email
        if self.first_name is not None and self.last_name is not None:
            full_name = (
                f"{str(self.first_name).capitalize()} "
                f"{str(self.last_name).capitalize()}"
            )
        return full_name

    def __str__(self) -> str:
        return self.get_full_name()

    def __repr__(self) -> str:
        return self.__str__()


class Product(TimestampsMixin):
    """This model represent the main entity of our market: a product"""

    title = models.CharField(
        max_length=200, null=False, blank=False, unique=True
    )
    is_active = models.BooleanField(default=1)
    price = models.FloatField()
    categories = models.ManyToManyField(to=Category)

    def __str__(self):
        return (
            f"{self.title} (Categories: "
            f"{', '.join([str(category) for category in self.categories.all()])})"
        )

    def __repr__(self) -> str:
        return self.__str__()

    @staticmethod
    def _get_start_of_month() -> datetime:
        return datetime.today().replace(
            day=1, hour=0, minute=0, second=0, microsecond=0
        )

    def get_prev_month_orders_qty(self) -> int:
        return len(
            self.order_set.filter(created_at__lt=self._get_start_of_month())
        )

    def get_curr_month_orders_qty(self) -> int:
        return len(
            self.order_set.filter(created_at__gte=self._get_start_of_month())
        )


class Order(TimestampsMixin):
    """This model stores data about orders made by customers"""

    customer = models.ForeignKey(to=Customer, on_delete=models.DO_NOTHING)
    products = models.ManyToManyField(to=Product)

    def __str__(self) -> str:
        return f"Order id: {self.id}, customer: {self.customer.email}"

    def __repr__(self) -> str:
        return self.__str__()
