from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from datetime import datetime

from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

    def validate_amount(self, amount_data):
        if amount_data != 500:
            raise ValidationError("The fees is INR 500!")

        return amount_data

    def validate(self, data: dict):
        account = data.get('account')
        
        payment = Payment.objects.filter(account=account).order_by('-created_at')

        if not payment:
            return data

        payment = payment[0]

        payment.created_at = payment.created_at.replace(tzinfo=None)

        duration = datetime.now() - payment.created_at
        duration = divmod(duration.total_seconds(), 24 * 60 * 60)[0]

        if duration < 30:
            raise ValidationError({"duration": "Payment can made only after next 30 days of last payment"})

        return data

    def create(self, validated_data):
        payment = Payment(**validated_data)
        payment.save()

        account = validated_data.get("account")
        account.batch = validated_data.get("batch")
        account.save()

        return payment