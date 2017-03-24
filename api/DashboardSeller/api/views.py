from channels import Group
from channels.auth import channel_session_user_from_http
from channels.sessions import channel_session
from rest_framework.decorators import api_view


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


@api_view(['POST'])
def perform_login(request):

    if request.method == 'POST':
