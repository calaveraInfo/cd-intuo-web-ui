/*
 * File: app/store/NurseCareStore.js
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

Ext.define('CestaDomu.store.NurseCareStore', {
    extend: 'Ext.data.Store',

    requires: [
        'CestaDomu.model.NurseCare',
        'Ext.data.proxy.Ajax',
        'Ext.data.writer.Xml',
        'Ext.data.reader.Xml'
    ],

    config: {
        model: 'CestaDomu.model.NurseCare',
        remoteFilter: true,
        remoteGroup: true,
        remoteSort: true,
        storeId: 'NurseCareStore',
        proxy: {
            type: 'intuo',
            api: {
                read: {
                    service: CestaDomu.controller.GetBindingViewX,
                    templates: {
                        
                    }
                },
                mappingType: 'xml',
                mapping: {
                    ID: 'c0',
                    startDate: 'c1',
                    nurse: 'c2',
                    Name: 'c3',
                    Description: 'c4',
                    durationtime: 'c5'
                }
            },
            extraParams: {
                viewId: 1721
            },
            url: 'xxx',
            writer: {
                type: 'intuo'
            },
            reader: {
                type: 'intuo',
                rootProperty: 'DocumentElement',
                record: 'WEB_x0020_průběhy_x0020_péče'
            }
        }
    }
});