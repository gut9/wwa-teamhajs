import json

import requests
from api.models import SellerUser
from api.serializers import SellerUserSerializer
from channels import Group
from channels.auth import channel_session_user_from_http
from channels.sessions import channel_session
from rest_framework.response import Response
from rest_framework.views import APIView


@channel_session_user_from_http
def ws_connect(message):
    Group("%s" % message.user).add(message.reply_channel)
    message.reply_channel.send({'accept': True})


@channel_session
def ws_receive(message):
    print message


@channel_session
def ws_disconnect(message):
    pass


class GetUser(APIView):
    def get(self, request):
        user = SellerUser.objects.get()
        serializer = SellerUserSerializer(user, many=False)
        return Response(serializer.data)

    def post(self, request):
        user = SellerUser.objects.get()
        serializer = SellerUserSerializer(user, many=False)
        return Response(serializer.data)


class LoginPerform(APIView):
    def post(self, request):
        login = request.POST["login"]
        password = request.POST["password"]

        # get token for user
        authResponse = requests.get('https://ssl.allegro.pl/auth/oauth/token?grant_type=client_credentials',
                                    auth=('a41f5b2a-8e87-4b8b-b6fe-74cc763720d7',
                                          'bxbb2gFqCP1aM3kNPeptAWQMGz9gosbe9JCO1sqlp0BhY9G4UufpkXgsSFQYE545'))

        accessToken = json.loads(authResponse.text)["access_token"]

        loginData = {'access_token': accessToken, 'login': login, 'password': password}
        loginResult = request.post('https://api.natelefon.pl/v1/allegro/login', loginData)

        responseData = {'access_token': accessToken, 'userId': loginResult}
        return Response(responseData)