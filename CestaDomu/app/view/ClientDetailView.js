/*
 * File: app/view/ClientDetailView.js
 *
 * This file was generated by Sencha Architect version 3.0.1.
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
        'Ext.Toolbar',
        'Ext.SegmentedButton',
        'Ext.Button',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.tab.Panel'
    ],

    config: {
        layout: {
            type: 'card',
            animation: 'fade'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                height: 50,
                items: [
                    {
                        xtype: 'segmentedbutton',
                        itemId: 'menu',
                        margin: 5,
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'nurse',
                                text: 'Průběhy'
                            },
                            {
                                xtype: 'button',
                                itemId: 'drug',
                                text: 'Medikace'
                            },
                            {
                                xtype: 'button',
                                itemId: 'doctor',
                                text: 'Lékařské'
                            }
                        ]
                    },
                    {
                        xtype: 'label',
                        itemId: 'quickInfo'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        width: 50,
                        text: '+'
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'Průběhy<br />péče',
                itemId: 'clientInfoContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'list',
                        flex: 40,
                        minWidth: 400,
                        itemTpl: [
                            '{[Ext.Date.format(values.time, \'d. m. Y H:i\')]} {nurse}<br/>',
                            '{aggreement}'
                        ],
                        store: 'NurseCareStore'
                    },
                    {
                        xtype: 'container',
                        flex: 60,
                        itemId: 'nurseCareInfo',
                        margin: 5,
                        layout: 'vbox'
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'Medikace',
                itemId: 'drugContainer',
                layout: 'fit',
                items: [
                    {
                        xtype: 'list',
                        itemTpl: [
                            '<span style="color: {[ values.authorizedByDoctor ? \'green\' : \'red\' ]};">{name}</span> {applicationType} {dose}<tpl if="symptom"> na {symptom}</tpl>',
                            '<tpl if="endDate">, od {[Ext.Date.format(values.startDate, \'d. m. Y\')]}</tpl><tpl if="endDate"> do {[Ext.Date.format(values.endDate, \'d. m. Y\')]}</tpl>',
                            '<tpl if="interval">, interval další aplikace: {interval}</tpl><tpl if="maxDose">, maximálně {maxDose}</tpl><tpl if="note">, {note}</tpl>'
                        ],
                        store: 'DrugStore',
                        grouped: true
                    }
                ]
            },
            {
                xtype: 'container',
                html: 'Lékařské zprávy',
                itemId: 'doctorContainer',
                margin: 5
            }
        ]
    }

});