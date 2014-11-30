Ext.define('CestaDomu.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        views: ['CestaDomu.view.ClientDetailView']
    },

    isActive: function() {
        return !Ext.os.is.Phone;
    },
    
    launch: function() {
        Ext.ClassManager.setAlias('CestaDomu.view.ClientDetailView', 'widget.clientDetailView');
    }
});