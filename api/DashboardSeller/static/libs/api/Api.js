/**
 * Created by przemyslawandrzejewski on 16.02.2017.
 */
function Api() {

}

Api.prototype.getMessages = function () {
    var that = this;
    $.ajax({
        url: "http://127.0.0.1:8000/api/getMessages",
        method: "GET",
        headers: {'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0]},
    }).done(function (response) {
        console.log(response);
        console.log("---:::(API) /getMessages")
    }).fail(function (error) {
        console.log(error);
    });
};

Api.prototype.getNotifications = function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/getNotifications",
        method: "GET",
        headers: {'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0]},
    }).done(function (response) {
        console.log(response);
        console.log("---:::(API) /getNotifications")
    }).fail(function (error) {
        console.log(error);
    });
};