/**
 * Created by przemyslawandrzejewski on 16.02.2017.
 */
$(document).ready(function () {
    console.log("---::: Minuari WebSocket Started :::---!");
    var playerChannel = new PlayerChannel();

    $('.sendButton').on('click', function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = dd+'-'+mm+'-'+yyyy;
        console.log("aasdas");
        playerChannel.sendMessage($('.userMessage').val());
        $('.direct-chat-messages').append('<div class="direct-chat-msg right">' +
            ' <div class="direct-chat-info clearfix">' +
            ' <span class="direct-chat-name pull-right">Klient</span>' +
            ' <span class="direct-chat-timestamp pull-left">'+ today+ '</span>' +
            ' </div> <!-- /.direct-chat-info --> <div class="direct-chat-text">' + $('.userMessage').val() + '  </div>' +
            ' <!-- /.direct-chat-text --> </div>');
        $('.userMessage').val("");
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = dd+'-'+mm+'-'+yyyy;
            playerChannel.sendMessage($('.userMessage').val());
            $('.direct-chat-messages').append('<div class="direct-chat-msg right">' +
                ' <div class="direct-chat-info clearfix">' +
                ' <span class="direct-chat-name pull-right">Klient</span>' +
                ' <span class="direct-chat-timestamp pull-left">' + today +'</span>' +
                ' </div> <!-- /.direct-chat-info --> <div class="direct-chat-text">' + $('.userMessage').val() + '  </div>' +
                ' <!-- /.direct-chat-text --> </div>');
            $('.userMessage').val("");
            e.preventDefault();
        }
    });
    //var api = new Api();
    //api.getMessages();
    //api.getNotifications();
    //notify.show("Hiello");

});

