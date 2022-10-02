const { exit } = require('process');
const http = require('request');
const fs = require('fs');
let CurrentTime = new Date().getTime();
let _Arg1 = process.argv[2]; // Argument 1
let _Arg2 = process.argv[3]; // Argument 2
let _Arg3 = process.argv[4]; // Argument Type of Execution
FileName =`${CurrentTime}-RealName`
function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}



function processData(body) { 
    let _serverJSONData = JSON.parse(body);
    let _getPlayers,_totalClients,_gameType,_country,_serverHostName,_hostType,_serverVersion,_serverResources,_maxClients,_projectName,_projectDescription,_oneSync,_enforceBuild,_scriptHook,_purityLevel,_serverDiscord,_ownerForum,_ownerForumName,_ownerForumID,_serverSupportStatus,_serverTags ,_AnonServer ,_EndPoint
    try {(_getPlayers = _serverJSONData.Data.players)}  catch (error) { _getPlayers = "UKNOWN";}
    try {(_totalClients = _serverJSONData.Data.clients)}  catch (error) { _totalClients = "UKNOWN";}
    try {(_gameType = _serverJSONData.Data.gamename)}  catch (error) { _gameType = "UKNOWN";}
    try {(_country = _serverJSONData.Data.locale)}  catch (error) { _country = "UKNOWN";}
    try {(_serverHostName = _serverJSONData.Data.hostname)}  catch (error) { _serverHostName = "UKNOWN";}
    try {(_hostType = isLinuxServer(_serverJSONData.Data.server))}  catch (error) { _hostType = "UKNOWN";}
    try {(_serverVersion = _serverJSONData.Data.server)}  catch (error) { _serverVersion = "UKNOWN";}
    try {(_serverResources = _serverJSONData.Data.resources)}  catch (error) { _serverResources = "UKNOWN";}
    try {(_maxClients = _serverJSONData.Data.vars.maxClients)}  catch (error) { _maxClients = "UKNOWN";}
    try {(_projectName = _serverJSONData.Data.vars.sv_projectName)}  catch (error) { _projectName = "UKNOWN";}
    try {(_projectDescription = _serverJSONData.Data.vars.sv_projectDesc)}  catch (error) { _projectDescription = "UKNOWN";}
    try {(_oneSync = _serverJSONData.Data.vars.onesync_enabled)}  catch (error) { _oneSync = "UKNOWN";}
    try {(_enforceBuild = _serverJSONData.Data.vars.sv_enforceGameBuild)}  catch (error) { _enforceBuild = "UKNOWN";}
    try {(_scriptHook = _serverJSONData.Data.vars.sv_scriptHookAllowed)}  catch (error) { _scriptHook = "UKNOWN";}
    try {(_purityLevel = _serverJSONData.Data.sv_pureLevel)}  catch (error) { _purityLevel = "UKNOWN";}
    try {(_serverDiscord = _serverJSONData.Data.vars.Discord)}  catch (error) { _serverDiscord = "UKNOWN";}
    try {(_ownerForum = _serverJSONData.Data.ownerProfile)}  catch (error) { _ownerForum = "UKNOWN";}
    try {(_ownerForumName = _serverJSONData.Data.ownerName)}  catch (error) { _ownerForumName = "UKNOWN";}
    try {(_ownerForumID = _serverJSONData.Data.ownerID)}  catch (error) { _ownerForumID = "UKNOWN";}
    try {(_serverSupportStatus = _serverJSONData.Data.support_status)}  catch (error) { _serverSupportStatus = "UKNOWN";}
    try {(_serverTags = _serverJSONData.Data.vars.tags)}  catch (error) { _serverTags = "UKNOWN";}
    try {(_AnonServer = _serverJSONData.Data.private)}  catch (error) { _AnonServer = "UKNOWN";}
    try {(_EndPoint = _serverJSONData.Data.connectEndPoints[0])}  catch (error) { _EndPoint = "UKNOWN";}
    return {_getPlayers : _getPlayers,_totalClients : _totalClients,_gameType : _gameType,_country : _country,_serverHostName : _serverHostName,_hostType : _hostType,_serverVersion : _serverVersion,_serverResources : _serverResources,_maxClients : _maxClients,_projectName : _projectName,_projectDescription : _projectDescription,_oneSync : _oneSync,_enforceBuild : _enforceBuild,_scriptHook : _scriptHook,_purityLevel : _purityLevel,_serverDiscord : _serverDiscord,_ownerForum : _ownerForum,_ownerForumName : _ownerForumName,_ownerForumID : _ownerForumID,_serverSupportStatus : _serverSupportStatus,_serverTags : _serverTags,_AnonServer : _AnonServer,_EndPoint : _EndPoint}
}


function _RequestSearch(_CurrentID, body) {
    let dataProcessed = processData(body);
    let _getPlayers = dataProcessed._getPlayers
    let _projectName = dataProcessed._projectName 
    let _EndPoint = dataProcessed._EndPoint
    var AllowedPlayers = []
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