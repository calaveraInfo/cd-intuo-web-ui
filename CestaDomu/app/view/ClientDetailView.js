/*
 * File: app/view/ClientDetailView.js
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

Ext.define('CestaDomu.view.ClientDetailView', {
    extend: 'Ext.Container',
    alias: 'widget.clientDetailView',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        layout: {
            type: 'card'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        docked: 'right',
                        text: 'Nový...'
                    }
                ]
            },
            {
                xtype: 'carousel',
                margin: 5,
                items: [
                    {
                        xtype: 'container',
                        title: 'Informace',
                        itemId: 'clientInfoContainer',
                        items: [
                            {
                                xtype: 'label',
                                html: 'test 1',
                                tpl: [
                                    '{name}'
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'Průběhy péče',
                        items: [
                            {
                                xtype: 'label',
                                html: 'test 2'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});