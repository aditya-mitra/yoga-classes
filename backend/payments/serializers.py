from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

    def validate_amount(self, amount_data):
        if amount_data != 500:
            raise ValidationError("The fees is INR 500!")

        return amount_data

    def create(self, validated_data):
        payment = Payment(**validated_data)
        payment.save()

        return payment