/*
 * File: app/store/WayOfWorking.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
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

Ext.define('CestaDomu.store.WayOfWorking', {
    extend: 'Ext.data.Store',

    requires: [
        'CestaDomu.model.Enumeration',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Xml',
        'Ext.data.writer.Xml'
    ],

    config: {
        model: 'CestaDomu.model.Enumeration',
        storeId: 'WayOfWorking',
        proxy: {
            type: 'intuo',
            api: {
                read: {
                    service: CestaDomu.controller.GetEnumerationActiveDataByReference
                },
                mappingType: 'xml',
                mapping: {
                    
                }
            },
            extraParams: {
                enumReference: 'typeWayOfWorking'
            },
            url: 'xxx',
            reader: {
                type: 'intuo',
                rootProperty: 'Values',
                record: 'EnumerationValueData'
            },
            writer: {
                type: 'intuo'
            }
        }
    }
});