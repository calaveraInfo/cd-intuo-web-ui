/*
 * File: app/store/ContactsStore.js
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

Ext.define('CestaDomu.store.ContactsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'CestaDomu.model.Contact',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Xml',
        'Ext.data.writer.Xml'
    ],

    config: {
        model: 'CestaDomu.model.Contact',
        remoteFilter: true,
        remoteGroup: true,
        remoteSort: true,
        storeId: 'ContactsStore',
        proxy: {
            type: 'intuo',
            api: {
                read: {
                    service: CestaDomu.controller.GetViewX,
                    templates: {
                        filterXml: new Ext.XTemplate('<Element type="Comparison"><SubElements><ElementCollection><Item><Element type="ColumnName"><AdditionalData columnName="name" displayName="Název" type="1" /></Element></Item><Item><Element type="Constant"><AdditionalData><anyType xmlns:q1="http://www.w3.org/2001/XMLSchema" d7p1:type="q1:string" xmlns:d7p1="http://www.w3.org/2001/XMLSchema-instance">{filters.name}%</anyType></AdditionalData></Element></Item></ElementCollection></SubElements><AdditionalData Operator="Like" /></Element>')
                    }
                },
                mappingType: 'xml',
                mapping: {
                    Name: 'c1'
                }
            },
            extraParams: {
                viewId: 1646
            },
            url: 'xxx',
            reader: {
                type: 'intuo',
                rootProperty: 'DocumentElement',
                record: 'WEB_x0020_všechny_x0020_kontakty'
            },
            writer: {
                type: 'intuo'
            }
        }
    }
});