/*
 * File: app/controller/WorkReportsController.js
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

Ext.define('CestaDomu.controller.WorkReportsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route',
        'Ext.Date',
        'Lib.Require'
    ],

    config: {
        routes: {
            'private/office/workReports': 'main'
        },

        refs: {
            workReportsView: {
                autoCreate: true,
                selector: 'workReportsView',
                xtype: 'workReportsView'
            },
            mainContainer: 'mainContainer',
            reportList: 'workReportsView list',
            workReportsForm: 'workReportsView formpanel',
            createWorkReportButton: 'workReportsView #createWorkReports',
            employee: 'workReportsView #employee'
        },

        control: {
            "workReportsView #loadWorkReports": {
                tap: 'onLoadButtonTap'
            },
            "workReportsView #createWorkReports": {
                tap: 'onCreateWorkReportButtonTap'
            },
            "workReportsView selectfield": {
                change: 'onSelectfieldChange'
            }
        }
    },

    onLoadButtonTap: function(button, e, eOpts) {
        CestaDomu.controller.Login.doLogged(
            this,
            function () {
                var store = Ext.getStore('WorkReportsStore');
                var timeFundStore = Ext.getStore('TimeFundStore');
                var filterData = this.getWorkReportsForm().getValues();
                var interval = Ext.getStore('WorkReportIntervals').getById(filterData.timeInterval);
                var dateFrom = interval.get('dateFrom');
                var dateTo = interval.get('dateTo');

                timeFundStore.filter('year', dateFrom.getFullYear());
                timeFundStore.filter('month', dateFrom.getMonth()+1);
                timeFundStore.filter('id', filterData.employee);
                timeFundStore.load();

                store.filter('dateFrom', Ext.Date.format(dateFrom, 'Y-m-d\\TH:i:s'));
                store.filter('dateTo', Ext.Date.format(dateTo, 'Y-m-d\\TH:i:s'));
                store.filter('id', filterData.employee);
                store.load();

                this.getCreateWorkReportButton().setDisabled(false);
            });
    },

    onCreateWorkReportButtonTap: function(button, e, eOpts) {
        var me = this;
        require(['resources/require/excel-builder/excel-builder'], function (builder) {
            try {

                var workbook = builder.createWorkbook();

                var sheet = me.initSheet(workbook);

                var styles = me.initStyles(workbook);

                var filterData = me.getWorkReportsForm().getValues();
                var interval = Ext.getStore('WorkReportIntervals').getById(filterData.timeInterval);
                var dateFrom = interval.get('dateFrom');
                var dateTo = interval.get('dateTo');
                var employee = Ext.getStore('EmployeesStore').getById(filterData.employee);

                var buffer = me.initBuffer(me, dateFrom, dateTo);

                me.loadBuffer(buffer);

                var data = me.initData(sheet, employee, interval, dateFrom, dateTo, styles, buffer);

                me.flushBuffer(buffer, data, styles);

                sheet.setData(data);

                location.href="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + builder.createFile(workbook);
            } catch (err) {
                Ext.Msg.alert("Chyba při vytvoření výkazu práce", "Zkontrolujte prosím, zda v seznamu výkazů nejsou chybné záznamy (červeně zvýrazněné), jinak kontaktujte administrátora.");
            }
        });
    },

    onSelectfieldChange: function(selectfield, newValue, oldValue, eOpts) {
        this.getCreateWorkReportButton().setDisabled(true);
    },

    onOfficeRoleSelected: function() {
        this.getApplication().redirectTo("private/office/workReports");
    },

    main: function() {
        this.getApplication().fireEvent("loginRequested", this, function () {
            this.getWorkReportsView(); // inicializace pomocí autoload

            var store = this.getEmployee().getStore();

            if (!store.isLoaded()) {
                store.load();
                Ext.Msg.show({
                    title: "Načítání dat...",
                    buttons: []
                });
                store.load(function(records, operation, success) {
                    if (success) {
                        this.getMainContainer().setActiveItem(this.getWorkReportsView());
                        Ext.Msg.hide();
                    } else {
                        Ext.Msg.alert('Chyba', 'Nepodařilo se načíst data zaměstnanců.');
                    }
                }, this);
            } else {
                this.getMainContainer().setActiveItem(this.getWorkReportsView());
            }
        });
    },

    finalizeView: function() {
        Ext.Msg.hide();
        this.getMainContainer().setActiveItem(this.getWorkReportsView());
    },

    getEasterMonday: function(year) {
        //http://techneilogy.blogspot.cz/2012/02/couple-of-years-ago-i-posted-source.html
        var a = year % 19;
        var b = Math.floor(year / 100);
        var c = year % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var n0 = (h + l + 7 * m + 114);
        var n = Math.floor(n0 / 31) - 1;
        var p = n0 % 31 + 1;
        var date = new Date(year,n,p+1);
        return date;
    },

    isHoliday: function(day) {
        //http://www.mpsv.cz/cs/74
        var easterMonday = this.getEasterMonday(day.getFullYear());
        if (
            (easterMonday.getDate() === day.getDate() && easterMonday.getMonth() === day.getMonth()) ||
            (1 === day.getDate() && 0 === day.getMonth()) ||
            (1 === day.getDate() && 4 === day.getMonth()) ||
            (8 === day.getDate() && 4 === day.getMonth()) ||
            (5 === day.getDate() && 6 === day.getMonth()) ||
            (6 === day.getDate() && 6 === day.getMonth()) ||
            (28 === day.getDate() && 8 === day.getMonth()) ||
            (28 === day.getDate() && 9 === day.getMonth()) ||
            (17 === day.getDate() && 10 === day.getMonth()) ||
            (24 === day.getDate() && 11 === day.getMonth()) ||
            (25 === day.getDate() && 11 === day.getMonth()) ||
            (26 === day.getDate() && 11 === day.getMonth())
        ) {
            return true;
        } else {
            return false;
        }
    },

    initStyles: function(workbook) {
        var styles = {};

        styles.workTimeStyle = workbook.getStyleSheet().createFormat({
            format: '0.00; -0.00;',
            alignment: {
                horizontal: 'right'
            },
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.sumsStyle = workbook.getStyleSheet().createFormat({
            format: '0.00',
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            },
            font: {
                bold: true
            }
        });

        styles.statisticsStyle = workbook.getStyleSheet().createFormat({
            format: '0.00'
        });

        styles.dateStyle = workbook.getStyleSheet().createFormat({
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.workTimeWeekendStyle = workbook.getStyleSheet().createFormat({
            format: '0.00; -0.00;',
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'FFDDDDDD'
            },
            alignment: {
                horizontal: 'right'
            },
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.workTimeHolidayStyle = workbook.getStyleSheet().createFormat({
            format: '0.00; -0.00;',
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'FF999999'
            },
            alignment: {
                horizontal: 'right'
            },
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.weekendStyle = workbook.getStyleSheet().createFormat({
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'FFDDDDDD'
            },
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.holidayStyle = workbook.getStyleSheet().createFormat({
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'FF999999'
            },
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.tableHeaderStyle = workbook.getStyleSheet().createFormat({
            alignment: {
                horizontal: 'right'
            },
            border: {
                bottom: {color: 'FF444444', style: 'thin'},
                right:  {color: 'FF444444', style: 'thin'}
            }
        });

        styles.stravenkyStyle = workbook.getStyleSheet().createFormat({
            format: '0'
        });

        return styles;
    },

    initSheet: function(workbook) {
        var sheet = workbook.createWorksheet();

        sheet.setHeader([
            '',
            {text: "VÝKAZ PRÁCE", bold: true, font: 48},
            ''
        ]);

        sheet.setColumns([
            {width: 11},
            {width: 7},
            {width: 7},
            {width: 7},
            {width: 7},
            {width: 7},
            {width: 7},
            {width: 8},
            {width: 8},
            {width: 8},
            {width: 13},
            {hidden: true},
            {hidden: true},
            {hidden: true}
        ]);

        workbook.addWorksheet(sheet);
        return sheet;
    },

    initData: function(worksheet, employee, interval, dateFrom, dateTo, styles, buffer) {
        var data = [];

        var timeFundStore = Ext.getStore('TimeFundStore');

        var timeFund = timeFundStore.first();

        var statisticsMetadata = {
            style: styles.statisticsStyle.id
        };

        data.push([employee.get('Forename') + ' ' + employee.get('Surname') + ', ' + interval.get('label')]);

        if (timeFund) {
            data.push(['Úvazek: ', '', '', timeFund.get('workLoad')]);
            worksheet.mergeCells('A'+data.length, 'C'+data.length);

            data.push(['Počet hodin k odpracování:', '', '', {value: timeFund.get('workingDaysWLWthHolidays')*8, metadata: statisticsMetadata}]);
            worksheet.mergeCells('A'+data.length, 'C'+data.length);
            var kOdpracovaniIndex = data.length;

            data.push(['Počet hodin úvazku za měsíc:', '', '', {value: timeFund.get('workingDaysWLCU')*8, metadata: statisticsMetadata}]);
            worksheet.mergeCells('A'+data.length, 'C'+data.length);
        }

        var praceVeSvatek = ['Práce ve státní svátek:', '', ''];
        data.push(praceVeSvatek);
        worksheet.mergeCells('A'+data.length, 'C'+data.length);

        var cekani = ['Čekání na práci:', '', ''];
        data.push(cekani);
        worksheet.mergeCells('A'+data.length, 'C'+data.length);

        var pohotovostBezSvatku = ['Práce v pohotovosti bez sv.:', '', ''];
        data.push(pohotovostBezSvatku);
        worksheet.mergeCells('A'+data.length, 'C'+data.length);

        var prescas = ['Přesčas k proplacení:', '', ''];
        data.push(prescas);
        worksheet.mergeCells('A'+data.length, 'C'+data.length);

        var stravenky = ['Počet stravenek:', '', ''];
        // data.push(stravenky);
        // worksheet.mergeCells('A'+data.length, 'C'+data.length);

        data.push(['']);

        var headerMetadata = {
            style: styles.tableHeaderStyle.id
        };

        data.push([
            {value: 'Datum', metadata: {style: styles.dateStyle.id}},
            {value: 'Nepoh.', metadata: headerMetadata},
            {value: 'Poh.', metadata: headerMetadata},
            {value: 'Celk.', metadata: headerMetadata},
            {value: 'Ček.', metadata: headerMetadata},
            {value: 'Nepl.', metadata: headerMetadata},
            {value: 'Lék.', metadata: headerMetadata},
            {value: 'Dov.[d]', metadata: headerMetadata},
            {value: 'Par.[d]', metadata: headerMetadata},
            {value: 'Nem.[d]', metadata: headerMetadata},
            {value: 'Obědová pauza', metadata: headerMetadata},
            {value: 'Svátek', metadata: headerMetadata},
            {value: 'Práce ve svátek', metadata: headerMetadata},
            {value: 'Pohotovost bez svátku', metadata: headerMetadata}
        ]);

        var sumsMetadata = {
            type: 'formula',
            style: styles.sumsStyle.id
        };

        var dataStartIndex = data.length+2;
        var dataEndIndex = dataStartIndex + dateTo.getDate() - 1;

        data.push([{value: 'Celkem', metadata: {style: styles.dateStyle.id}},
                   {value: 'SUM(B'+dataStartIndex+':B'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(C'+dataStartIndex+':C'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(D'+dataStartIndex+':D'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(E'+dataStartIndex+':E'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(F'+dataStartIndex+':F'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(G'+dataStartIndex+':G'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(H'+dataStartIndex+':H'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(I'+dataStartIndex+':I'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(J'+dataStartIndex+':J'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: '', metadata: sumsMetadata},
                   {value: '', metadata: sumsMetadata},
                   {value: 'SUM(M'+dataStartIndex+':M'+dataEndIndex+')', metadata: sumsMetadata},
                   {value: 'SUM(N'+dataStartIndex+':N'+dataEndIndex+')', metadata: sumsMetadata}
                  ]);

        stravenky.push({
            value: 'D'+(dataStartIndex-1)+'/8',
            metadata: {
                type: 'formula',
                style: styles.stravenkyStyle.id
            }
        });

        cekani.push({
            value: 'E'+(dataStartIndex-1)+'-C'+(dataStartIndex-1),
            metadata: {
                type: 'formula',
                style: styles.statisticsStyle.id
            }
        });

        praceVeSvatek.push({
            value: 'M'+(dataStartIndex-1),
            metadata: {
                type: 'formula',
                style: styles.statisticsStyle.id
            }
        });

        pohotovostBezSvatku.push({
            value: 'N'+(dataStartIndex-1),
            metadata: {
                type: 'formula',
                style: styles.statisticsStyle.id
            }
        });

        if (timeFund) {
            prescas.push({
                value: 'D'+(dataStartIndex-1)+'-D'+kOdpracovaniIndex,
                metadata: {
                    type: 'formula',
                    style: styles.statisticsStyle.id
                }
            });
        }

        return data;
    },

    initBuffer: function(me, dateFrom, dateTo) {
        var dny = {};
        for (var i = dateFrom.getDate(); i <= dateTo.getDate(); i++) {
            var datum = new Date(dateFrom.getTime());
            datum.setDate(i);
            dny[i] = {
                den: datum,
                nepohotovost: 0,
                pohotovost: 0,
                celkemPrace: 0,
                cekaniNaPraci: 0,
                dovolena: 0,
                nemoc: 0,
                neplacene: 0,
                lekar: 0,
                paragraf: 0,
                vykaz: [],
                vykazDokumentace: [],
                vykazDovolene: []
            };

            if (datum.getDay() === 0 || datum.getDay() === 6) {
                dny[i].vikend = true;
            } else {
                dny[i].vikend = false;
            }

            if (me.isHoliday(datum)) {
                dny[i].svatek = true;
            } else {
                dny[i].svatek = false;
            }
        }

        var buffer = {
            dny: dny,
            celkem: {
                praceSvatek: 0,
                pohotovostBezSvatku: 0
            }
        };

        return buffer;
    },

    loadBuffer: function(buffer) {
        var dny = buffer.dny;
        var store = Ext.getStore('WorkReportsStore');
        store.each(function (item, index, length) {
            var category;
            var poradi;
            var totalDuration;
            switch(item.get('TypeClass')) {
                case 'Výkaz práce': //Výkaz práce 85953
                    poradi = item.get('start').getDate();
                    totalDuration = item.get('durationtime') + item.get('transportDuration');
                    category = 'xxx';
                    if (item.get('ServiceType') == 'Z - Čekání na práci v pohotovosti') {
                        category = 'cekaniNaPraci';
                    } else if (item.get('ServiceType') == 'Návštěva u lékaře') {
                        category = 'lekar';
                    } else if (item.get('ServiceType') == 'Neplacené volno') {
                        category = 'neplacene';
                    } else if(item.get('wayOfWorking') == 'Pohotovost') {
                        category = 'pohotovost';
                    } else if (item.get('wayOfWorking') == 'Nepohotovost') {
                        category = 'nepohotovost';
                    }
                    dny[poradi][category] += totalDuration;
                    break;
                case 'Výkaz práce na dokumentaci': //Výkaz práce na dokumentaci 85954
                    poradi = item.get('start').getDate();
                    totalDuration = item.get('durationtime') + item.get('transportDuration');
                    category = 'xxx';
                    if (item.get('ServiceType') == 'Z - Čekání na práci v pohotovosti') {
                        category = 'cekaniNaPraci';
                    } else if (item.get('ServiceType') == 'Návštěva u lékaře') {
                        category = 'lekar';
                    } else if (item.get('ServiceType') == 'Neplacené volno') {
                        category = 'neplacene';
                    } else if(item.get('documentationWayOfWorking') == 'Pohotovost') {
                        category = 'pohotovost';
                    } else if (item.get('documentationWayOfWorking') == 'Nepohotovost') {
                        category = 'nepohotovost';
                    }
                    dny[poradi][category] += totalDuration;
                    break;
                case 'Dovolená': //dovolena 894
                    var startDay = item.get('AppointmentStart').getDate();
                    var endDay = item.get('AppointmentEnd').getDate();
                    switch (item.get('TypeOfAbsence')){
                        case 'Dovolená':
                            category = 'dovolena';
                            break;
                        case 'Nemoc':
                            category = 'nemoc';
                            break;
                        case 'Paragraf':
                            category = 'paragraf';
                            break;
                        default:
                            category = 'xxx';
                            break;
                    }

                    dny[startDay][category] += item.get('DaysOfHoliday');
                    for (var i = startDay + 1; i <= endDay; i++) {
                        dny[i][category] = 'x';
                    }
                    break;
            }
        });

        for (var row in dny) {
            if (dny[row].svatek) {
                buffer.celkem.praceSvatek += dny[row].pohotovost + dny[row].nepohotovost;
            } else {
                buffer.celkem.pohotovostBezSvatku += dny[row].pohotovost;
            }
        }
    },

    flushBuffer: function(buffer, data, styles) {
        var dny = buffer.dny;

        var obedy = {};
        obedy['0'] = '11:30-12:00';
        obedy['1'] = '12:00-12:30';
        obedy['2'] = '12:30-13:00';
        obedy['3'] = '13:00-13:30';
        obedy['4'] = '13:30-14:00';

        for (var row in dny) {
            var dateMetadata = {
                style: styles.dateStyle.id
            };

            var workMetadata = {
                style: styles.workTimeStyle.id
            };

            var praceCelkem = {value: 'B'+(data.length+1)+'+C'+(data.length+1), metadata: {type: 'formula', style: styles.workTimeStyle.id}};

            if (dny[row].vikend) {
                dateMetadata.style = styles.weekendStyle.id;
                workMetadata.style = styles.workTimeWeekendStyle.id;
                praceCelkem.metadata.style = styles.workTimeWeekendStyle.id;
            }

            if (dny[row].svatek) {
                dateMetadata.style = styles.holidayStyle.id;
                workMetadata.style = styles.workTimeHolidayStyle.id;
                praceCelkem.metadata.style = styles.workTimeHolidayStyle.id;
            }

            var obed = '';
            if ((dny[row].nepohotovost+dny[row].pohotovost)>0) {
                obed = obedy[Math.floor(Math.random()*5)];
            }

            data.push([
                {value: (dny[row].xxx > 0) ? 'Chyba: v tomto dni existuji vykaz(y) prace, u nichz nebyla rozpoznana kategorie.' : Ext.Date.format(dny[row].den, 'd. m. Y'), metadata: dateMetadata},
                {value: dny[row].nepohotovost/60, metadata: workMetadata},
                {value: dny[row].pohotovost/60, metadata: workMetadata},
                praceCelkem,
                {value: dny[row].cekaniNaPraci/60, metadata: workMetadata},
                {value: dny[row].neplacene/60, metadata: workMetadata},
                {value: dny[row].lekar/60, metadata: workMetadata},
                {value: dny[row].dovolena, metadata: workMetadata},
                {value: dny[row].paragraf, metadata: workMetadata},
                {value: dny[row].nemoc, metadata: workMetadata},
                {value: obed, metadata: dateMetadata},
                {value: dny[row].svatek ? 1 : 0},
                {value: 'IF(L'+(data.length+1)+'=1,D'+(data.length+1)+',0)', metadata: {type: 'formula'}},
                {value: 'IF(L'+(data.length+1)+'=0,C'+(data.length+1)+',0)', metadata: {type: 'formula'}}
            ]);
        }

    },

    init: function(application) {

        application.on([
        { event: 'officeRoleSelected', fn: this.onOfficeRoleSelected, scope: this }
        ]);
    }

});