from rest_framework import serializers
from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.auth import JWTAuthentication

from .models import Account, Contact, Batch
from .serializers import AccountOutputSerializer, AccountLoginInputSerializer, AccountSignupSerializer, BatchOutputSerializer


class AccountViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Account
            fields = ('name', 'age', 'batch', 'created_at', 'updated_at')

    def get(self, request: Request):
        return Response(AccountOutputSerializer(request.user).data)


class AccountCreateLoginViewSet(GenericViewSet):
    def create(self, request: Request):
        serializer = AccountSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        account = serializer.create(serializer.validated_data)

        return Response({
            "account": account.id,
            "token": JWTAuthentication.generate_jwt_token(account.id)}, 
            status=status.HTTP_201_CREATED)


    def login(self, request: Request):
        serializer = AccountLoginInputSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        email = serializer.data.get('email')
        contact = Contact.objects.get(email=email)

        return Response({
            "account": contact.account.id,
            "token": JWTAuthentication.generate_jwt_token(contact.account.id)
        })


class BatchViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def list(self, request: Request):
        serializer = BatchOutputSerializer(Batch.objects.all(), many=True)
        return Response(serializer.data)

    def get(self, request: Request, batch_id: int):
        try:
            batch = Batch.objects.get(id=batch_id)
        except Batch.DoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BatchOutputSerializer(batch)
        return Response(serializer.data)
        
