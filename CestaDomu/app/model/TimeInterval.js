/*
 * File: app/model/TimeInterval.js
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

Ext.define('CestaDomu.model.TimeInterval', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'id',
                type: 'auto'
            },
            {
                convert: function(v, rec) {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);

                    var id = rec.get('id');
                    date.setMonth(date.getMonth()-(1+id));
                    date.setDate(1);

                    return date;
                },
                name: 'dateFrom',
                type: 'date'
            },
            {
                convert: function(v, rec) {
                    var date = new Date();
                    date.setHours(23);
                    date.setMinutes(59);
                    date.setSeconds(59);
                    date.setMilliseconds(0);

                    var id = rec.get('id');
                    date.setMonth(date.getMonth()-id);
                    date.setDate(0);

                    return date;
                },
                name: 'dateTo',
                type: 'date'
            },
            {
                convert: function(v, rec) {
                    var dateFrom = rec.get('dateFrom');
                    return dateFrom.getFullYear() + '/' + (dateFrom.getMonth()+1);
                },
                name: 'label',
                type: 'string'
            }
        ]
    }
});