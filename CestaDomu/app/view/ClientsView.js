/*
 * File: app/view/ClientsView.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
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

Ext.define('CestaDomu.view.ClientsView', {
    extend: 'Ext.Container',
    alias: 'widget.clientsView',

    requires: [
        'Ext.TitleBar',
        'Ext.field.Search',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Klienti'
            },
            {
                xtype: 'container',
                margin: 5,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'searchfield',
                        id: 'searchText',
                        width: '100%',
                        label: 'Hledat jméno:'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        id: 'searchButton',
                        margin: 5,
                        text: 'Vyhledat'
                    }
                ]
            },
            {
                xtype: 'list',
                height: '90%',
                itemId: 'clientsList',
                emptyText: 'Žádné výsledky',
                itemTpl: [
                    '{Name}'
                ],
                loadingText: 'Pracuji...',
                store: 'ContactsStore'
            }
        ]
    }

});