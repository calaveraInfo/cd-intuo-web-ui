Ext.define('Lib.IntuoProxy', { 
    alias: 'proxy.intuo', 
    extend: 'Ext.data.proxy.Ajax',
    config: {
        actionMethods: {
            read: 'POST'
        }
    },
    buildUrl: function(request) { 
        return this.getApi()[request.getOperation().getAction()].service.url;
    },
    updateReader: function(value) {
        value.setProxyApi(this.getApi());
    },
    updateWriter: function(value) {
        value.setProxyApi(this.getApi());
    }
});