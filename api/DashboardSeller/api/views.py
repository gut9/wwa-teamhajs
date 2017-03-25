# -*- coding: utf-8 -*-
import base64
import hashlib

import json
import urllib

import requests
from django.shortcuts import render
from django.views.generic import View
from rest_framework.renderers import JSONRenderer

from api.models import SellerUser, NegativeFeedbacks, Feedbacks, Averages, SellerRating, NeutralFeedbacks, \
    PositiveFeedbacks, FrequentlyAskedQuestions
from api.serializers import SellerUserSerializer, FrequentlyAskedQuestionsSerializer
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
    try:
        prefix, userId = message['path'].strip('/').split('/')
        Group("%s" % userId).add(message.reply_channel)
        message.reply_channel.send({'accept': True})
    except:
        pass

@channel_session
def ws_receive(message):
    # serializer = MessageSerializer(message, many=False)
    response = json.loads(message.content['text'])
    message = Message(offerId=response['auctionId'], clientId=response['clientId'], text=response['message'])
    message.save()
    # Group("%s" % "1").send({'text': JSONRenderer().render({'data': "dupa"})})


@channel_session
def ws_disconnect(message):
    pass


class GetUser(APIView):
    def get(self, request):
        user_id = "3836789"
        auth_response = requests.get('https://ssl.allegro.pl/auth/oauth/token?grant_type=client_credentials',
                                     auth=('a41f5b2a-8e87-4b8b-b6fe-74cc763720d7',
                                           'bxbb2gFqCP1aM3kNPeptAWQMGz9gosbe9JCO1sqlp0BhY9G4UufpkXgsSFQYE545'))

        access_token = json.loads(auth_response.text)["access_token"]
        user_data = {'access_token': access_token}
        user_result = requests.get('https://api.natelefon.pl/v1/allegro/users/' + user_id, data=user_data)

        user = SellerUser.objects.filter(UserId=user_id)
        if not user:
            response = json.loads(user_result.text)
            negative_feedback = response['feedbacks']['negative']
            negative_feedbacks = NegativeFeedbacks(all=negative_feedback['all'], lastMonth=negative_feedback['lastMonth'], percentage=negative_feedback['percent'], asBuyer=negative_feedback['asBuyer'], asSeller=negative_feedback['asSeller'], lastWeek=negative_feedback['lastWeek'])
            negative_feedbacks.save()

            neutral_feedback = response['feedbacks']['neutral']
            neutral_feedbacks = NeutralFeedbacks(all=neutral_feedback['all'], lastMonth=neutral_feedback['lastMonth'], percentage=neutral_feedback['percent'], asBuyer=neutral_feedback['asBuyer'], asSeller=neutral_feedback['asSeller'], lastWeek=neutral_feedback['lastWeek'])
            neutral_feedbacks.save()

            positive_feedback = response['feedbacks']['positive']
            positive_feedbacks = PositiveFeedbacks(all=positive_feedback['all'], lastMonth=positive_feedback['lastMonth'], percentage=positive_feedback['percent'], asBuyer=positive_feedback['asBuyer'], asSeller=positive_feedback['asSeller'], lastWeek=positive_feedback['lastWeek'])
            positive_feedbacks.save()

            feedbacks = Feedbacks(all=response['feedbacks']['all'], negative=negative_feedbacks, neutral=neutral_feedbacks, positive=positive_feedbacks)
            feedbacks.save()

            seller_ratings = SellerRating(count=response['sellerRatings']['count'])
            seller_ratings.save()

            averages = response['sellerRatings']['averages']
            for average in averages:
                single_average = Averages(rating=average['rating'], title=average['title'], sellerRating=seller_ratings)
                seller_ratings.averages_set.add(single_average)
            seller_ratings.save()
            new_seller_user = SellerUser(allegroStandard=response['allegroStandard'], company=response['company'],
                                         country=response['country'], feedbacks=feedbacks, login=response['login'],
                                         rating=response['rating'], ratingIcon=response['ratingIcon'], sellerRatings=seller_ratings, UserId=user_id)
            new_seller_user.save()
            serializer = SellerUserSerializer(new_seller_user, many=False)
            return Response(serializer.data)
        else:
            serializer = SellerUserSerializer(user.get(), many=False)
            return Response(serializer.data)

    def post(self, request):
        user = SellerUser.objects.get()
        serializer = SellerUserSerializer(user, many=False)
        return Response(serializer.data)


class LoginPerform(APIView):
    def post(self, request):
        json_request = json.loads(request.body)
        login = json_request['login']
        passwd = json_request['password']
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
            return Response(response_data)


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

            users_ids = messages.values('clientId').distinct()

            for userDict in users_ids:
                user_origin_id = userDict["clientId"]
                message = messages.filter(clientId=user_origin_id).latest('date')
                user_data = requests.get("https://api.natelefon.pl/v1/allegro/users/" + user_origin_id +
                                         "?access_token=" + access_token)
                client_name = json.loads(user_data.text)["login"]
                offer_id = offer.offerId
                offer_data = requests.get("https://api.natelefon.pl/v1/allegro/offers/" + offer_id +
                                          "?access_token=" + access_token)
                auction_name = json.loads(offer_data.text)["name"]

                data = {
                    'authorId': message.authorId,
                    'clientId': user_origin_id,
                    'clientName': client_name,
                    'auctionId': offer_id,
                    'auctionName': auction_name,
                    'lastMsg': message.text,
                    'wasRead': message.read
                }
                response_data.append(data)

        return Response(response_data)

    def post(self, request):
        author_id = request.POST["authorId"]
        user_id = request.POST["clientId"]
        offer_id = request.POST["destOfferId"]
        text = request.POST["text"]
        date = now
        read = False

        new_message = Message(authorId=author_id, clientId=user_id, destOfferId=offer_id, text=text, date=date, read=read)
        return new_message.save()


class GetMessagesForRoom(APIView):
    def get(self, request):
        if 'auctionId' not in request.GET.keys() or 'clientId' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        auction_id = request.GET["auctionId"]
        client_id = request.GET["clientId"]
        messages = Message.objects.filter(offerId=auction_id).filter(clientId=client_id)
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)


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
            title = json.loads(response_offer_data.text)["name"]
            views_counter = json.loads(response_offer_data.text)["views"]
            data = {'title': title, 'views': views_counter, 'msgCount': messages_counter}
            views_data.append(data)

        return Response(views_data)


class GetFrequentlyAskedQuestions(APIView):

    def get(self, request):
        # offer_id = json.loads(request.body)['offerId']
        offer = Offer.objects.all().filter(offerId=request.GET['offerId'])
        serializer = FrequentlyAskedQuestionsSerializer(offer, many=False)
        return Response(serializer.data)

    def post(self, request):
        response = json.loads(request.body)
        user_id = response['userId']
        offer_id = response['offerId']
        question = response['question']
        answer = response['answer']

        frequently_asked_question = FrequentlyAskedQuestions(user=SellerUser.objects.get(UserId=user_id),
                                                             offer=Offer.objects.get(offerId=offer_id), question=question,
                                                             answer=answer)
        offer = Offer.objects.get(offerId=offer_id)
        offer.frequentlyaskedquestions_set.add(frequently_asked_question)

        offer.save()
        return Response(status=status.HTTP_200_OK)


class ClientMessenger(View):
    def get(self, request):
        return render(request, 'index.html')

class AuctionDetails(APIView):

    def get(self, request):
        if 'auctionId' not in request.GET.keys() or 'accessToken' not in request.GET.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        access_token = request.GET["accessToken"]
        auction_id = request.GET["auctionId"]
        offer_data = requests.get("https://api.natelefon.pl/v1/allegro/offers/" + auction_id +
                                  "?access_token=" + access_token)
        json_auction_data = json.loads(offer_data.text)

        response_data = {
            'title': json_auction_data["name"],
            'auction': json_auction_data["auction"],
            'views': json_auction_data["views"],
            'secondsLeft': json_auction_data["secondsLeft"]
        }

        return Response(response_data)
