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
    console.clear()
    http(`https://policy-live.fivem.net/api/getUserInfo/`+uuid, function (err, response, body) {
        if (!err) {  
            if (response.statusCode == 200) {
                var _ReadJSON = JSON.parse(body);
                var UserName = _ReadJSON.username;
                var PossiblyRealName = _ReadJSON.name;
                var SuspensionUntil = _ReadJSON.suspended_till;
                var Clan = _ReadJSON.groups // When was this a thing lmao
                log(`CFX Forum Link..................: https://forum.cfx.re/u/${UserName}`)
                log(`CFX Unique ID...................: ${uuid}`)
                log(`CFX Forum Username..............: ${UserName}`)
                if (PossiblyRealName != ``) {
                    log(`Real Name.......................: ${PossiblyRealName}`)
                }
                _exit()
            }else{
                log(`Error...........................: User not found.`)
                _exit()
            }
        }else{
            log(`Error...........................: FiveM API Couldn't be reached? API Down or Internet Down?`)
            _exit()
        }
    });
}
_RequestSearch(_Arg1);