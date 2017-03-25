/**
 * Created by przemyslawandrzejewski on 27.02.2017.
 */
var chat_socket = null;
function PlayerChannel() {
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);
    this.responseChannel();
    this.requestChannel();
}

PlayerChannel.prototype.requestChannel = function() {
    $('.manage').on('click', function (event) {
        var message = {
            handle: "val",
            message: "message"
        };
        chat_socket.send(JSON.stringify(message));
        return false;
    });
};

PlayerChannel.prototype.sendMessage = function(userMessage) {
    var message = {
        message: userMessage,
        clientId: "34873768",
        auctionId: "6459854838"

    };
    chat_socket.send(JSON.stringify(message))
};

PlayerChannel.prototype.responseChannel = function() {
    var that = this;
    chat_socket.onmessage = function (message) {
        var data = JSON.parse(message.data);
        console.log(data);
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
        //if (data.data.clientId != "21956707") {
            $('.direct-chat-messages').append('<div class="direct-chat-msg">' +
                ' <div class="direct-chat-info clearfix">' +
                ' <span class="direct-chat-name pull-right">Sprzedawca</span>' +
                ' <span class="direct-chat-timestamp pull-left">'+ today +'</span>' +
                ' </div> <!-- /.direct-chat-info --> <div class="direct-chat-text">' + data.data.message + '  </div>' +
                ' <!-- /.direct-chat-text --> </div>');
        }
    //};
};

PlayerChannel.prototype.manageRestaurantResponse = function(data) {
    var income = $('.income');
    income.animate({"color": "#2ecc71", "font-size": "48px"}, 100);
    income.text(data.income + '€').animate({"color": "#ffffff", "font-size": "24px"}, 100);
    var customers = $('.customers')
    customers.text(data.consumer_set.length)


};