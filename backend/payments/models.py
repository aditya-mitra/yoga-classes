from django.db import models

from accounts.models import Account, Batch

class Payment(models.Model):
    account = models.ForeignKey(to=Account, on_delete=models.CASCADE)
    batch = models.ForeignKey(to=Batch, on_delete=models.CASCADE)

    amount = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)
