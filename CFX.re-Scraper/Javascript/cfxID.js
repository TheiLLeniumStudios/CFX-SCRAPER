const { exit } = require('process');
const http = require('request');
const fs = require('fs');
let CurrentTime = new Date().getTime();
let _Arg1 = process.argv[2]; // Argument 1
let _Arg2 = process.argv[3]; // Argument 2
let _Arg3 = process.argv[4]; // Argument Type of Execution
FileName =`${CurrentTime}-ServerID`
function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}
let _ServerCache = [] // Cache the servers from the FiveM-API
let _RequestServerInformation = [] // Cache the servers from the FiveM-API we already searched
let _AnonServers = []  // Servers that are private [Not in server list] - This wont display player names/identifiers [Only Server Name and Info]
let _TotalServersCached = 0 // Total servers cached
let _TotalServersFinished = 0 // Total servers finished
let _TotalFailedRequestes = 0 // Total failed requests 
let _TotalOfflineServers = 0 // Total offline servers
let _TotalRecoveredServers = 0 // Total servers recovered that we couln't reach due to ratelimit issues
let _TotalPlayersFound = 0 // Total players found
let _TotalFoundByArgument = 0 // Total servers found by argument


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
    let _AnonServer = false
    let _FailedServerID = ''
    let _FailedServerIP = ''
    let dataProcessed = processData(body);
    let _getPlayers = dataProcessed._getPlayers
    let _totalClients = dataProcessed._totalClients 
    let _gameType = dataProcessed._gameType 
    let _country = dataProcessed._country
    let _serverHostName = dataProcessed._serverHostName
    let _hostType = dataProcessed._hostType 
    let _serverVersion = dataProcessed._serverVersion
    let _serverResources = dataProcessed._serverResources 
    let _maxClients = dataProcessed._maxClients
    let _projectName = dataProcessed._projectName 
    let _projectDescription = dataProcessed._projectDescription
    let _oneSync = dataProcessed._oneSync
    let _enforceBuild = dataProcessed._enforceBuild 
    let _scriptHook = dataProcessed._scriptHook
    let _purityLevel = dataProcessed._purityLevel
    let _serverDiscord = dataProcessed._serverDiscord
    let _ownerForum = dataProcessed._ownerForum
    let _ownerForumName = dataProcessed._ownerForumName
    let _ownerForumID  = dataProcessed._ownerForumID
    let _serverSupportStatus = dataProcessed._serverSupportStatus
    let _serverTags = dataProcessed._serverTags
    let _EndPoint = dataProcessed._EndPoint
    _AnonServer = dataProcessed._AnonServer
    let PlayerList = []
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
        _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _EndPoint,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name":_ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList})
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
    let headers = {	'Content-Type': 'application/json',	'Accept-Encoding': 'gzip','user-agent': 'Mozilla/5.0'};
    let options = {url: `https://servers-frontend.fivem.net/api/servers/single/${ID}`,method: 'GET',headers: headers,gzip: true};
    http(options, function(error, response, body) {
        let _CurrentID = ID
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