Intuo web UI
============

This is an unofficial fat javascript/html5 client for Intuo CRM (http://www.digres.cz/crm-system-intuo) using it's web services addon module. It's created for non-profit hospice institution Cesta domů (http://www.cestadomu.cz/) and tailored for their patient agenda.

#Prerequisites
* Sencha Cmd 4

#Building

* sencha app build -c package

#Running

## Development (without build)

* cd CestaDomu
* sencha web start
* http://localhost:1841/

## Pre-release (after building)

* cd CestaDomu/build/package/CestaDomu
* sencha web start
* http://localhost:1841/