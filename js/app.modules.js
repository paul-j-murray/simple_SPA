(function () {
    var module = app.modules.Hello = {
        route: 'hello/:msg',
        vm: function (req) {
            this.message = ko.observable(req.args['msg']);
        }
    };
})();

(function () {
    var module = app.modules.Bye = {
        route: 'bye/:msg',
        vm: function (req) {
            this.message = ko.observable(req.args['msg']);
        }
    };
})();