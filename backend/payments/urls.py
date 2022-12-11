from django.urls import path

from .views import PaymentsViewSet

urlpatterns = [
    path('', PaymentsViewSet.as_view({"get": "get_payments"})),
    path('create', PaymentsViewSet.as_view({"post": "create_payment"})),
]