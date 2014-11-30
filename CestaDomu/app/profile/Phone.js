Ext.define('CestaDomu.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        views: ['CestaDomu.view.ClientDetailViewPhone']
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },
    
    launch: function() {
        Ext.ClassManager.setAlias('CestaDomu.view.ClientDetailViewPhone', 'widget.clientDetailView');
    }
});