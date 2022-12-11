from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Batch(models.Model):
    starting_time = models.DateTimeField()
    ending_time = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Account(AbstractBaseUser):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    password = models.CharField(max_length=200)
    batch = models.ForeignKey(Batch, null=True, blank=True, on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    USERNAME_FIELD = 'name'

class Contact(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    email = models.EmailField()
    phone = models.CharField(max_length=12, null=True, blank=True)
    address = models.TextField(null=True, blank=True)