const { exit } = require('process');
const http = require('request');
const fs = require('fs');
var _Arg1 = process.argv[2]; // Argument 1
var _Arg2 = process.argv[3]; // Argument 2
var _Arg3 = process.argv[4]; // Argument Type of Execution

function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}

function _RequestSearch(uuid) {
    var _DecimalToUUID = parseInt(uuid, 16);
    log(`Steam Link......................: https://steamcommunity.com/profiles/${_DecimalToUUID}`)
    _exit()
}
_RequestSearch(_Arg1);