from django.urls import path

from .views import AccountViewSet, AccountCreateLoginViewSet, BatchViewSet

urlpatterns = [
    path('', AccountViewSet.as_view({"get": "get"})),
    path('login', AccountCreateLoginViewSet.as_view({"post": "login"})),
    path('signup', AccountCreateLoginViewSet.as_view({"post": "create"})),

    path('batch', BatchViewSet.as_view({"get": "list"}))
]