const { exit } = require('process');
const http = require('request');
const fs = require('fs');
var CurrentTime = new Date().getTime();
var _Arg1 = process.argv[2]; // Argument 1
var _Arg2 = process.argv[3]; // Argument 2
var _Arg3 = process.argv[4]; // Argument Type of Execution
FileName =`${CurrentTime}-ServerID`
function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}
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


function _RequestSearch(_CurrentID, body) {
    var _AnonServer = false
    var _FailedServerID = ''
    var _FailedServerIP = ''
    var _serverJSONData = JSON.parse(body);
    var _getPlayers = _serverJSONData.Data.players;
    var _totalClients = _serverJSONData.Data.clients;
    var _gameType = _serverJSONData.Data.gamename;
    var _country = _serverJSONData.Data.locale;
    var _serverHostName = _serverJSONData.Data.hostname;
    var _hostType = isLinuxServer(_serverJSONData.Data.server);
    var _serverVersion = _serverJSONData.Data.server
    var _serverResources = _serverJSONData.Data.resources;
    var _maxClients = _serverJSONData.Data.vars.maxClients;
    var _projectName = _serverJSONData.Data.vars.sv_projectName;
    var _projectDescription = _serverJSONData.Data.vars.sv_projectDesc;
    var _oneSync = _serverJSONData.Data.vars.onesync_enabled;
    var _enforceBuild = _serverJSONData.Data.vars.sv_enforceGameBuild;
    var _scriptHook = _serverJSONData.Data.vars.sv_scriptHookAllowed;
    var _purityLevel = _serverJSONData.Data.sv_pureLevel;
    var _serverDiscord = _serverJSONData.Data.vars.Discord;
    var _ownerForum = _serverJSONData.Data.ownerProfile;
    var _ownerForumName = _serverJSONData.Data.ownerName;
    var _ownerForumID = _serverJSONData.Data.ownerID;
    var _serverSupportStatus = _serverJSONData.Data.support_status;
    var _serverTags = _serverJSONData.Data.vars.tags;
    var _AnonServer = _serverJSONData.Data.private;
    var _EndPoint = _serverJSONData.Data.connectEndPoints[0];
    var PlayerList = []
    if (_projectName != undefined) {
        log(`Current Action..................: Server ID Search`)
        log(`Server Found....................: TRUE`)
        log(`Server IPv4.....................: ${_EndPoint}`)
        log(`Server Unique ID................: ${_CurrentID}`)
        log(`More Information................: Added to 'Sessions/${FileName}.json'`)
        for (let i = 0; i < _getPlayers.length; i++) {
            if (_getPlayers[i].identifiers != '') {
                var IdentitiyInformation = []
                for (let x = 0; x < _getPlayers[i].identifiers.length; x++) {
                    if (_getPlayers[i].identifiers[x].includes('steam:')) {
                        _temp = {"type": "Steam", "id": _getPlayers[i].identifiers[x]}
                        IdentitiyInformation.push(_temp)
                    }
                    if (_getPlayers[i].identifiers[x].includes('license:')) {
                        _temp = {"type": "License", "id": _getPlayers[i].identifiers[x]}
                        IdentitiyInformation.push(_temp)
                    }
                    if (_getPlayers[i].identifiers[x].includes('xbl:')) {
                        _temp = {"type": "Xbl", "id": _getPlayers[i].identifiers[x]}
                        IdentitiyInformation.push(_temp)
                    }
                    if (_getPlayers[i].identifiers[x].includes('live:')) {
                        _temp = {"type": "Live", "id": _getPlayers[i].identifiers[x]}
                        IdentitiyInformation.push(_temp)
                    }
                    if (_getPlayers[i].identifiers[x].includes('fivem:')) {
                        _temp = {"type": "FiveM", "id": _getPlayers[i].identifiers[x]}
                        IdentitiyInformation.push(_temp)
                    }
                    if (_getPlayers[i].identifiers[x].includes('discord:')) {
                        _temp = {"type": "Discord", "id": _getPlayers[i].identifiers[x]}
                        IdentitiyInformation.push(_temp)
                    }
                }
                PlayerList.push({"name": _getPlayers[i].name,"identity": IdentitiyInformation,"ping": _getPlayers[i].ping,"id": _getPlayers[i].id,})
            }else{
                _FailedServerID = _CurrentID
                _FailedServerIP = _EndPoint
                _AnonServer = true 
            }
        }
        _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _EndPoint,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
        if (_AnonServer == true) {
            _AnonServer = false
            _AnonServers.push(_CurrentID)
        }
        fs.writeFileSync(`Sessions/${FileName}.json`, JSON.stringify(_RequestServerInformation, null, 4)) 
        setTimeout(function() {
        _exit()
        }, 1000)
    }
}
async function _Execute(ID) { 
    console.clear()
    var headers = {	'Content-Type': 'application/json',	'Accept-Encoding': 'gzip','user-agent': 'Mozilla/5.0'};
    var options = {url: `https://servers-frontend.fivem.net/api/servers/single/${ID}`,method: 'GET',headers: headers,gzip: true};
    http(options, function(error, response, body) {
        var _CurrentID = ID
        if (!error && response.statusCode == 200) {
            _RequestSearch(_CurrentID, body)
        }
    });
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
            _Execute(_Arg1)
        });
    }else{
        _Execute(_Arg1)
    }
});