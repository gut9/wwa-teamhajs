# -*- coding: utf-8 -*-
import base64
import hashlib

import json
import urllib

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

from api.serializers import OfferSerializer


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
    def get(self, request):
        # login = request.POST["login"]
        # passwd = request.POST["password"]
        login = "bad_drone"
        passwd = "QsVr1#?5IP"
        password_sha = hashlib.sha256(passwd).digest()
        password = base64.urlsafe_b64encode(password_sha)

        # get token for user
        auth_response = requests.get('https://ssl.allegro.pl/auth/oauth/token?grant_type=client_credentials',
                                     auth=('a41f5b2a-8e87-4b8b-b6fe-74cc763720d7',
                                           'bxbb2gFqCP1aM3kNPeptAWQMGz9gosbe9JCO1sqlp0BhY9G4UufpkXgsSFQYE545'))

        access_token = json.loads(auth_response.text)["access_token"]

        login_data = {'access_token': access_token, 'userLogin': login, 'hashPass': password}
        login_result = requests.post('https://api.natelefon.pl/v1/allegro/login', data=login_data)

        if login_result.status_code == 401:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        elif login_result.status_code == 403:
            return Response(status=status.HTTP_403_FORBIDDEN)
        elif login_result.status_code == 400:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            response_data = {'access_token': access_token, 'userId': login}
            return Response(response_data, status=status.HTTP_200_OK)


class GetAuctions(APIView):
    def get(self, request):
        if 'userId' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user_id = request.GET['userId']
        user = SellerUser.objects.get(UserId=user_id)
        offers = Offer.objects.filter(owner=user)

        serialize = OfferSerializer(offers, many=True)
        return Response(serialize.data)


class ManageMessages(APIView):
    def get(self, request):
        if 'userId' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        access_token = request.GET["accessToken"]
        user_id = request.GET["userId"]
        user = SellerUser.objects.get(UserId=user_id)
        offers = Offer.objects.filter(owner=user)
        response_data = []

        for offer in offers:
            offer_id = offer.offerId
            messages = Message.objects.filter(offerId=offer_id)

            users_ids = messages.values('originUserId').distinct()

            for userDict in users_ids:
                user_origin_id = userDict["originUserId"]
                message = messages.filter(originUserId=user_origin_id).latest('date')
                user_data = requests.get("https://api.natelefon.pl/v1/allegro/users/" + user_origin_id +
                                         "?access_token=" + access_token)
                client_name = json.loads(user_data.text)["login"]
                offer_id = offer.offerId
                offer_data = requests.get("https://api.natelefon.pl/v1/allegro/offers/" + offer_id +
                                         "?access_token=" + access_token)
                auction_name = json.loads(offer_data.text)["name"]

                data = {
                    'clientId': user_origin_id,
                    'clientName': client_name,
                    'auctionName': auction_name,
                    'lastMsg': message.text,
                    'wasRead': message.read
                }
                response_data.append(data)

        return Response(response_data)

    def post(self, request):
        user_id = request.POST["originUserId"]
        offer_id = request.POST["destOfferId"]
        text = request.POST["text"]
        date = now
        read = False

        new_message = Message(originUserId=user_id, destOfferId=offer_id, text=text, date=date, read=read)
        return new_message.save()


class HourStatisticsGetter(APIView):
    def get(self, request):
        if 'userId' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user_id = request.GET["userId"]
        user = SellerUser.objects.get(UserId=user_id)
        offers = Offer.objects.filter(owner=user)

        messages_counter = 0
        stats = range(0, 23)

        for i in range(0, 23):
            stats[i] = 0

        for offer in offers:
            offer_id = offer.offerId
            messages = Message.objects.filter(offerId=offer_id)

            for message in messages:
                date = message.date
                stats[date.hour] += 1
                messages_counter += 1

        return Response(stats)


class GetVisitStatistics(APIView):
    def get(self, request):
        if 'userId' not in request.GET.keys() or 'accessToken' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        access_token = request.GET['accessToken']
        user_id = request.GET['userId']
        user = SellerUser.objects.get(UserId=user_id)
        offers = Offer.objects.filter(owner=user)
        views_data = []

        for offer in offers:
            offer_id = offer.offerId
            messages = Message.objects.filter(offerId=offer_id)
            messages_counter = 0

            for _ in messages:
                messages_counter += 1

            response_offer_data = requests.get(
                "https://api.natelefon.pl/v1/allegro/offers/" + offer_id + "?access_token=" + access_token)
            views_counter = json.loads(response_offer_data.text)["views"]
            data = {'views': views_counter, 'msgCount': messages_counter}
            views_data.append(data)

        return Response(views_data)
