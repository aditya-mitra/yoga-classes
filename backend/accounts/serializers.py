from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from .models import Account, Contact, Batch

class AccountOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('name', 'age', 'batch', 'created_at', 'updated_at')


class AccountLoginInputSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, attrs: dict):
        try:
            contact = Contact.objects.get(email=attrs["email"])
        except Contact.DoesNotExist:
            raise AuthenticationFailed('Email not found!')

        account = contact.account

        if attrs["password"] != account.password:
            raise AuthenticationFailed('Invalid Password!')

        return attrs


class AccountSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=100)
    password = serializers.CharField()
    age = serializers.IntegerField()

    def validate_email(self, email_data: str):
        try:
            Contact.objects.get(email=email_data)
            raise ValidationError('Email already exists!')
        except Contact.DoesNotExist:
            pass
        return email_data

    @staticmethod
    def create(validated_data: dict):
        email = validated_data.pop("email")
        account = Account.objects.create(**validated_data)
        
        contact = Contact(account=account, email=email)
        contact.save()

        return account


class BatchOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ('starting_time', 'ending_time', 'created_at', 'updated_at')
