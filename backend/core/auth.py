import jwt
from datetime import datetime, timedelta

from rest_framework.authentication import BaseAuthentication,  get_authorization_header
from rest_framework.exceptions import AuthenticationFailed

from accounts.models import Account

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth:
            return None

        if len(auth) != 2:
            raise AuthenticationFailed('Invalid JWT Header')

        try:
            decoded_token = jwt.decode(auth[1], "secret", algorithms=["HS256"])
            account_id = decoded_token.get("account")
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid JWT Decode')

        try:
            user = Account.objects.get(id=account_id)
        except Account.DoesNotExist:
            raise AuthenticationFailed('No such user')

        return (user, auth[1])
        
    @staticmethod
    def generate_jwt_token(account_id: int):
        payload = {
            "account": account_id,
            "exp": datetime.now() + timedelta(days=2)
        }

        token = jwt.encode(payload, "secret", algorithm="HS256")
        return token