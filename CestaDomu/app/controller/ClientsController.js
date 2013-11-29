/*
 * File: app/controller/ClientsController.js
 *
 * This file was generated by Sencha Architect version 3.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CestaDomu.controller.ClientsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {
        routes: {
            'private/clients': 'main'
        },

        refs: {
            mainContainer: 'mainContainer',
            clientsView: {
                autoCreate: true,
                selector: 'clientsView',
                xtype: 'clientsView'
            },
            searchText: '#searchText'
        },

        control: {
            "#searchButton": {
                tap: 'onSearchButtonTap'
            },
            "#clientsList": {
                itemtap: 'onListItemTap'
            }
        }
    },

    onSearchButtonTap: function(button, e, eOpts) {
        var searchText = this.getSearchText().getValue();
        if (searchText && searchText.length > 2) {
            var store = Ext.getStore('ContactsStore');
            store.filter('name', searchText);
            store.load();
        } else {
            Ext.Msg.alert('Příliš obecné hledání', 'Pro vyhledání podle jména je nutné zadat více než 2 znaky, jinak by množství nalezených záznamů mohlo být příliš velké.');
        }

    },

    onListItemTap: function(dataview, index, target, record, e, eOpts) {
        this.getApplication().fireEvent("clientSelected", record.id);

    },

    onLoggedIn: function() {
        this.getApplication().redirectTo("private/clients");
    },

    main: function() {
        this.getMainContainer().setActiveItem(this.getClientsView());
    },

    init: function(application) {

        application.on([
        { event: 'loggedIn', fn: this.onLoggedIn, scope: this }
        ]);
    }

});