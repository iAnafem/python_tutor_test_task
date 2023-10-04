from datetime import timedelta
from typing import List
from random import choice, randint
from faker import Faker
from django.utils.timezone import make_aware
from django.db.utils import IntegrityError
from django.contrib.auth.models import User
from faker.providers import internet, person
from market.models import Product, Order, Customer, Category
import market.services.const as const

fake = Faker()
fake.add_provider(internet)
fake.add_provider(person)


def _make_admin_user() -> None:
    try:
        User.objects.create_superuser(
            username="admin", password="admin", email="admin@email.com"
        )
    except IntegrityError:
        return


def _make_customers() -> None:
    for customer_id in range(500):
        Customer.objects.create(
            email=fake.email,
            first_name=fake.first_name(),
            last_name=fake.last_name(),
        )


def _make_curr_month_orders(customers_ids: List[int]) -> None:
    for order_num in range(300):
        customer_id = choice(customers_ids)
        for i in range(randint(1, 5)):
            order = Order.objects.create(customer_id=customer_id)
            order.created_at = make_aware(fake.date_time_this_month())
            order.save()


def _make_prev_month_orders(customers_ids: List[int]) -> None:
    for order_num in range(800):
        customer_id = choice(customers_ids)
        for i in range(randint(1, 5)):
            order = Order.objects.create(customer_id=customer_id)
            order.created_at = make_aware(
                fake.date_time_this_month() - timedelta(days=25)
            )
            order.save()


def _make_categories() -> None:
    for category in const.CATEGORIES:
        try:
            Category.objects.create(name=category)
        except IntegrityError:
            return


def _make_products() -> None:
    for entry in const.PRODUCTS:
        product = Product.objects.create(
            title=entry.get("title"), is_active=1, price=entry.get("price")
        )
        product.categories.add(
            Category.objects.get(name__exact=entry.get("category")).id
        )
        product.save()


def _fill_orders_with_products() -> None:
    products = list(Product.objects.all().values_list("id", flat=True))
    for order in Order.objects.all():
        for idx in range(5):
            product_id = choice(products)
            if product_id not in order.products.all().values_list(
                "id", flat=True
            ):
                order.products.add(product_id)
                order.save()


def fill_test_data(*args, **kwargs) -> None:
    _make_admin_user()
    _make_customers()
    customers_ids = list(Customer.objects.all().values_list("id", flat=True))
    _make_curr_month_orders(customers_ids=customers_ids)
    _make_prev_month_orders(customers_ids=customers_ids)
    _make_categories()
    _make_products()
    _fill_orders_with_products()
