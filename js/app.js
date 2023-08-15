(function (exports) {
    var app = exports.app = {
        bindingContext: {
            domnode: null,
            model: null,
            loadTemplate: function (templateName) {
                return document.getElementById(templateName).innerHTML;
            },
            bind: function (templateName, vm) {
                this.domnode.innerHTML = this.loadTemplate(templateName);
                ko.applyBindings(vm, this.domnode);
                this.model = vm;
            },
            clear: function () {
                if(this.domnode !== null) this.domnode.innerHTML = null;
                this.model = null;
            }
        },
        modules: {},
        router: {            
            registerModule: function (moduleName, module) {
                if (!module.route) module.route = moduleName.toLowerCase();
                if (!module.templateName) module.templateName = moduleName.toLowerCase() + '.tmpl';
                
                Path.map('#/' + module.route).to(function () {
                    app.bindingContext.bind(module.templateName, new module.vm({args: this.params}));
                });
            },
            register: function (path, handler) {
                Path.map('#/' + path).to(function () {
                    app.bindingContext.clear();
                    handler({path: this.path, args: this.params});
                });
            },
            setDefault: function (path) {
                Path.root('#/' + path);
            },
            start: function () {
                Path.listen();
            }
        },
        init: function (bindingCtxNode) {
            this.bindingContext.domnode = bindingCtxNode;

            for(var moduleName in app.modules) {
                this.router.registerModule(moduleName, app.modules[moduleName]);
            }
            
            this.router.start();
        }
    };
})(window)