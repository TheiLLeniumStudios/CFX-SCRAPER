const { exit } = require('process');
const http = require('request');
const fs = require('fs');
var CurrentTime = new Date().getTime();
var _Arg1 = process.argv[2]; // Argument 1
var _Arg2 = process.argv[3]; // Argument 2
var _Arg3 = process.argv[4]; // Argument Type of Execution
FileName =`${CurrentTime}-RealName`
function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}
function _saveArray() { fs.writeFileSync(`Sessions/${FileName}.json`, JSON.stringify(_RequestServerInformation, null, 4));setTimeout(_saveArray, 1000 * 2);}

var _ServerCache = [] // Cache the servers from the FiveM-API
var _RequestServerInformation = [] // Cache the servers from the FiveM-API we already searched
var _AnonServers = []  // Servers that are private [Not in server list] - This wont display player names/identifiers [Only Server Name and Info]
var _TotalServersCached = 0 // Total servers cached
var _TotalServersFinished = 0 // Total servers finished
var _TotalFailedRequestes = 0 // Total failed requests 
var _TotalOfflineServers = 0 // Total offline servers
var _TotalRecoveredServers = 0 // Total servers recovered that we couln't reach due to ratelimit issues
var _TotalPlayersFound = 0 // Total players found
var _TotalFoundByArgument = 0 // Total servers found by argument
var FiveMIDs = []

async function readFileData(tempFileName) {
    gsubPercent = tempFileName.replaceAll("%", " ")
    var _data = fs.readFileSync(`Sessions/${gsubPercent}.json`);
    var _data = JSON.parse(_data);
    log(`Current Action..................: WARNING - This may take a bit to complete/read`)
    for (let i = 0; i < _data.length; i++) {
        _TotalFoundByArgument++;
        try {
            identityTable = _data[i].identity;
            for (let i = 0; i < identityTable.length; i++) {
                if (identityTable[i].type == "FiveM") { 
                    var ID = identityTable[i].id
                    var newIDFormat = ID.replace('fivem:', '')
                    data = {"Identifiers":identityTable,"FiveMID":newIDFormat}
                    FiveMIDs.push(data)
                }
            }
        } catch (error) {
            log(`Error...........................: This file is not supported - Please use a "Player Scrape All" file`)
            _exit()
        }
    }
    for (let ids = 0; ids < FiveMIDs.length; ids++) {
        if (ids % 1000 === 0) { // Every 1000 players, wait 3 seconds to prevent rate limit (This is a nice way to prevent ratelimit issues in the future)
            await _delay(3000);
        }
        http('https://policy-live.fivem.net/api/getUserInfo/'+FiveMIDs[ids]['FiveMID'], function (err, response, body) {
            if (!err) {  
                if (response.statusCode == 200) {
                    var _userInfo = JSON.parse(body);
                    var UserName = _userInfo.username;
                    var PossiblyRealName = _userInfo.name
                    if (PossiblyRealName != '') {
                        _data = {"Using Identifiers": FiveMIDs[ids]['Identifiers'] ,"Found By": "fivem:"+FiveMIDs[ids]['FiveMID'], "CFX Username": UserName, "Listed Real Name": PossiblyRealName}
                        _RequestServerInformation.push(_data)
                        _TotalPlayersFound++
                    }else{
                        _TotalFailedRequestes++
                    }
                }else{
                    _TotalOfflineServers++
                
                }
            }else{
                _TotalFailedRequestes++
            }
            console.clear()
            log("\n")
            log(`Current Action..................: File To Real Name Scan`)
            log(`Total Names Found...............: ${_TotalPlayersFound}`)
            log(`Total NoNames Found.............: ${_TotalFailedRequestes}`)
            log(`Total Failed Checks.............: ${_TotalOfflineServers}`)
        });
    }
}



const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Want to add a custom save file? [N/y] - ', booleanTest => {
    if (booleanTest == "Y" || booleanTest == "y") {
        readline.question('What is the name of the file? - ', FileNameInput => {
            FileName = FileNameInput
            readline.close();
            _saveArray()
            readFileData(_Arg1)
        });
    }else{
        _saveArray()
        readFileData(_Arg1)
    }
});
