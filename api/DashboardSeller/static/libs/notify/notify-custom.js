/**
 * Created by przemyslawandrzejewski on 20.02.2017.
 */

function Notify() {
    this.changeNotifyStyle();
}

Notify.prototype.show = function (message) {
    $.notify(message, {
        style: 'default'
    });
};

Notify.prototype.changeNotifyStyle = function () {
    $.notify.addStyle('default', {
        html: "<div class='text-center'><span class='fa fa-user'></span> <span data-notify-text/></div>",
        classes: {
            base: {
                "background-color": "#3a6e7a",
                "padding": "8px 10px 5px 10px",
                "color": '#ffffff',
                "border": '1px solid #074553',
                "min-width": "220px",
                "min-height": "40px"
            }
        }
    });
};