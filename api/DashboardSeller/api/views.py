# -*- coding: utf-8 -*-
import base64
import hashlib

import json

import requests
from api.models import SellerUser
from api.serializers import SellerUserSerializer
from channels import Group
from channels.auth import channel_session_user_from_http
from channels.sessions import channel_session
from django.utils.timezone import now
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Message
from api.models import Offer

from api.serializers import MessageSerializer


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
        passwd = request.POST["password"]
        password_sha = hashlib.sha256(passwd)
        password = base64.b64encode(str(password_sha))

        # get token for user
        auth_response = requests.get('https://ssl.allegro.pl/auth/oauth/token?grant_type=client_credentials',
                                     auth=('a41f5b2a-8e87-4b8b-b6fe-74cc763720d7',
                                           'bxbb2gFqCP1aM3kNPeptAWQMGz9gosbe9JCO1sqlp0BhY9G4UufpkXgsSFQYE545'))

        access_token = json.loads(auth_response.text)["access_token"]

        # login_data = {'access_token': access_token, 'userLogin': login, 'hashPass': password}
        # login_result = requests.post('https://api.natelefon.pl/v1/allegro/login', data=login_data)

        # if login_result.status_code == 401:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
        # elif login_result.status_code == 403:
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        # elif login_result.status_code == 400:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        # else:
        response_data = {'access_token': access_token, 'userId': login}
        return Response(response_data, status=status.HTTP_200_OK)


class GetAuctions(APIView):
    def get(self, request):
        access_token = request.GET["access_token"]


class ManageMessages(APIView):
    def get(self, request):
        if 'auction_id' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            auction_id = request.GET["auction_id"]

        if 'only_unread' in request.GET.keys():
            offer = Offer.objects.get(offerId=auction_id, read=False)
        else:
            offer = Offer.objects.get(offerId=auction_id)

        messages = offer.message_set.all()
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)

    def post(self, request):
        user_id = request.POST["user_id"]
        offer_id = request.POST["offer_id"]
        text = request.POST["text"]
        date = now
        read = False

        new_message = Message(originUserId=user_id, destOfferId=offer_id, text=text, date=date, read=read)
        # new_message.save()
        return Message.objects.create(new_message)

