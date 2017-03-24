from channels import Group
from channels.auth import channel_session_user_from_http
from channels.sessions import channel_session


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
