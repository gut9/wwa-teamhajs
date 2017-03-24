from channels import Group
from channels.auth import channel_session_user_from_http
from channels.sessions import channel_session
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import SellerUser
from api.serializers import SellerUserSerializer


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
