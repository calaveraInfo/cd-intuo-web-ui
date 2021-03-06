/*
 * File: app/model/RawWorkReport.js
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

Ext.define('CestaDomu.model.RawWorkReport', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Xml',
        'Ext.data.writer.Xml'
    ],

    config: {
        idProperty: 'ID',
        fields: [
            {
                name: 'ID',
                type: 'auto'
            },
            {
                name: 'Class',
                type: 'int'
            },
            {
                name: 'startDate',
                type: 'date'
            },
            {
                name: 'durationtime',
                type: 'int'
            },
            {
                name: 'transportDuration',
                type: 'int'
            },
            {
                name: 'ServiceTypeID',
                type: 'int'
            },
            {
                name: 'wayOfWorking',
                type: 'int'
            },
            {
                name: 'formWork',
                type: 'int'
            },
            {
                name: 'Description',
                type: 'string'
            }
        ],
        proxy: {
            type: 'intuo',
            api: {
                create: {
                    service: CestaDomu.controller.CreateObject,
                    templates: {
                        dataXml: new Ext.XTemplate('<dig:ArrayOfAnyType><dig:anyType xsi:type="xsd:string">{["{"]}pb:Company{["}"]}</dig:anyType><dig:anyType xsi:type="xsd:int">{requestParams.contactId}</dig:anyType></dig:ArrayOfAnyType><dig:ArrayOfAnyType><dig:anyType xsi:type="xsd:string">{["{"]}pb:Project{["}"]}</dig:anyType><dig:anyType xsi:type="xsd:int">{requestParams.pacientId}</dig:anyType></dig:ArrayOfAnyType><dig:ArrayOfAnyType><dig:anyType xsi:type="xsd:string">{["{"]}pb:cdPROCourseCare{["}"]}</dig:anyType><dig:anyType xsi:type="xsd:int">{requestParams.careId}</dig:anyType></dig:ArrayOfAnyType>')
                    }
                },
                mapping: {
                    ID: 'CreateObjectResult'
                },
                mappingType: 'xml'
            },
            extraParams: {
                className: 'cdService'
            },
            url: 'xxx',
            reader: {
                type: 'intuo',
                rootProperty: 'Body',
                record: 'CreateObjectResponse'
            },
            writer: {
                type: 'intuo'
            }
        }
    }
});