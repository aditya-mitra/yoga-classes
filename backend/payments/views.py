from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from core.auth import JWTAuthentication

from .models import Payment
from .serializers import PaymentSerializer

class PaymentsViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_payments(self, request):
        payments = Payment.objects.filter(account=request.user)

        serializer = PaymentSerializer(payments, many=True)

        return Response(serializer.data)

    def create_payment(self, request):
        request_data = {**request.data, "account": request.user.id}
        serializer = PaymentSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response({}, status=status.HTTP_200_OK)
    

    