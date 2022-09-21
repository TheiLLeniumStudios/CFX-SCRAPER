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
    var AllowedPlayers = []
    var FoundRealPlayers = []
    
    if (_projectName != undefined) {
        log(`Current Action..................: Real Name Check`)
        log(`Server Found....................: TRUE`)
        log(`Server IPv4.....................: ${_EndPoint}`)
        log(`Server Unique ID................: ${_CurrentID}`)
        for (let i = 0; i < _getPlayers.length; i++) {
            if (_getPlayers[i].identifiers != '') {
                var IdentitiyInformation = []
                var isRealNameFound = false
                for (let x = 0; x < _getPlayers[i].identifiers.length; x++) {
                    if (_getPlayers[i].identifiers[x].includes('fivem:')) {
                        gsub = _getPlayers[i].identifiers[x].replace('fivem:', '')
                        http('https://policy-live.fivem.net/api/getUserInfo/'+gsub, function (err, response, body) {
                            if (!err) {  
                                if (response.statusCode == 200) {
                                    var _userInfo = JSON.parse(body);
                                    var UserName = _userInfo.username;
                                    var PossiblyRealName = _userInfo.name
                                    if (PossiblyRealName != '') {
                                        _data = {"type": "FiveM", "id": _getPlayers[i].identifiers[x], "username": UserName, "realname": PossiblyRealName}
                                        AllowedPlayers.push(_getPlayers[i].id)
                                        log(`\n`)
                                        log(`Player Found....................: ${_getPlayers[i].name} [${_getPlayers[i].id}]`)
                                        log(`Ping............................: ${_getPlayers[i].ping}`)
                                        log(`Server ID.......................: ${_getPlayers[i].id}`)
                                        log(`Player Real Name................: ${PossiblyRealName}`)
                                        log(`Player Identifiers..............: ${_getPlayers[i].identifiers}`)

                                    }
                                }
                            }
                        });
                    }
                }
            }else{
                _FailedServerID = _CurrentID
                _FailedServerIP = _EndPoint
                _AnonServer = true 
            }
        }
    } 
    setTimeout(function() {
        _Execute(_Arg1)
    }, 15 * 1000);
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
_Execute(_Arg1)