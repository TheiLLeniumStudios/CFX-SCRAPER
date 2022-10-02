const { exit } = require('process');
const http = require('request');
const fs = require('fs');
let CurrentTime = new Date().getTime();
let _Arg1 = process.argv[2]; // Argument 1
let _Arg2 = process.argv[3]; // Argument 2
let _Arg3 = process.argv[4]; // Argument Type of Execution
let globalTask = "N/A"
CommitActionString() // Commit Action String
FileName = `${CurrentTime}-${globalTask}`
let _ServerCache = [] // Cache the servers from the FiveM-API
let _RequestServerInformation = [] // Cache the servers from the FiveM-API we already searched
let _AnonServers = []  // Servers that are private [Not in server list] - This wont display player names/identifiers [Only Server Name and Info]
let _TotalServersCached = 0 // Total servers cached
let _TotalServersFinished = 0 // Total servers finished
let _TotalFailedRequestes = 0 // Total failed requests 
let _TotalOfflineServers = 0 // Total offline servers
let _TotalRecoveredServers = 0 // Total servers recovered that we couln't reach due to ratelimit issues
let _TotalPlayersFound = 0 // Total players found
let _TotalFoundByArgument = 0 // Total servers found by argumelet
function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _saveArray() { fs.writeFileSync(`Sessions/${FileName}.json`, JSON.stringify(_RequestServerInformation, null, 4));setTimeout(_saveArray, 1000 * 2);}
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


function SearchByServerName(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined) {
        gsubPercent = _Arg1.replaceAll("%", " ")
        if (_projectName.toLowerCase().includes(gsubPercent.toLowerCase())) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    PlayerList.push({"name": _getPlayers[i].name,"identity": IdentitiyInformation,"ping": _getPlayers[i].ping,"id": _getPlayers[i].id})
                }else{
                    _FailedServerID = _CurrentID
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchByResourceName(_CurrentIP, _CurrentID, body) {
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
    _FoundVariable = false
    var PlayerList = []
    if (_projectName != undefined) {
        for (x in _serverResources) {
            if (_serverResources[x].toLowerCase().includes(_Arg1.toLowerCase())) {
                _FoundVariable = true
            } 
        }
        if (_FoundVariable == true) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchByPlayerCount(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined) {
        if (_totalClients >= _Arg1 && _totalClients <= _Arg2) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchByOneSync(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined) {
        if (_oneSync.toLowerCase() == _Arg1.toLowerCase()) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchByScripthook(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined) {
        if (_scriptHook.toLowerCase() == _Arg1.toLowerCase()) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchByBuildVersion(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined) {
        if (_enforceBuild.toLowerCase() == _Arg1.toLowerCase()) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchByHostType(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined) {
        if (_hostType.toLowerCase() == _Arg1.toLowerCase()) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function SearchBySupportType(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    if (_projectName != undefined && _serverSupportStatus != undefined) {
        if (_serverSupportStatus.toLowerCase() == _Arg1.toLowerCase()) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
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
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function PlayerNameSearch(_CurrentIP, _CurrentID, body) {
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
    _FoundVariable = false
    var _PlayerNameFound = [];
    if (_projectName != undefined) {
        if (_AnonServer == false) {
            for (let i = 0; i < _getPlayers.length; i++) {
                if (_getPlayers[i].name.toLowerCase().includes(_Arg1.toLowerCase())) {
                    _FoundVariable = true;
                    _PlayerNameFound.push({name: _getPlayers[i].name,id: _getPlayers[i].id, identifiers: _getPlayers[i].identifiers})
                }
            }
        }
        if (_FoundVariable == true) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
                if (_getPlayers[i].identifiers != '') {
                    // Good Server
                }else{
                    _FailedServerID = _CurrentID
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Players Found": _PlayerNameFound,})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
        }
    }
}
function PlayerIdentifierSearch(_CurrentIP, _CurrentID, body) {
    _FoundVariable = false;
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
    var _PlayerNameFound = [];
    if (_projectName != undefined) {
        if (_AnonServer == false) {
            for (let i = 0; i < _getPlayers.length; i++) {
                for (let x = 0; x < _getPlayers[i].identifiers.length; x++) {
                    if (_getPlayers[i].identifiers[x].includes(_Arg1.toLowerCase())) {
                        _PlayerNameFound.push({name: _getPlayers[i].name,id: _getPlayers[i].id, identifiers: _getPlayers[i].identifiers})
                        _FoundVariable = true
                    }
                }
            }
        }
        if (_FoundVariable == true) {
            _TotalFoundByArgument++
            for (let i = 0; i < _getPlayers.length; i++) {
                _TotalPlayersFound++
                if (_getPlayers[i].identifiers != '') {
                    // Good Server
                }else{
                    _FailedServerID = _CurrentID
                    _FailedServerIP = _CurrentIP
                    _AnonServer = true 
                }
            }
            _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Players Found": _PlayerNameFound[0]})
            if (_AnonServer == true) {
                _AnonServer = false
                _AnonServers.push(_CurrentID)
            }
            fs.writeFileSync(`Sessions/${FileName}.json`, JSON.stringify(_RequestServerInformation, null, 4)) 
            setTimeout(function() {
            log('\n')
            log(`FOUND...........................: TRUE`)

            _exit()
            }, 3000)
        }
    }
}
function ScrapeAllInformation(_CurrentIP, _CurrentID, body) {
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
    var PlayerList = []
    for (let i = 0; i < _getPlayers.length; i++) {
        _TotalPlayersFound++
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
            _FailedServerIP = _CurrentIP
            _AnonServer = true 
        }
    }
    _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Resources": _serverResources,"Server Players": PlayerList,})
    if (_AnonServer == true) {
        _AnonServer = false
        _AnonServers.push(_CurrentID)
    }
}
function ScrapeAllPlayers(_CurrentIP, _CurrentID, body) { 
    let _AnonServer = false
    let _FailedServerID = ''
    let _FailedServerIP = ''
    let dataProcessed = processData(body);
    let _getPlayers = dataProcessed._getPlayers
    _AnonServer = dataProcessed._AnonServer
    var PlayerList = []
    for (let i = 0; i < _getPlayers.length; i++) {
        _TotalPlayersFound++
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
            _RequestServerInformation.push({"Server-ID-Seen-In":_CurrentID,"name": _getPlayers[i].name,"identity": IdentitiyInformation})
        }else{
            _FailedServerID = _CurrentID
            _FailedServerIP = _CurrentIP
            _AnonServer = true 
        }
    }
    if (_AnonServer == true) {
        _AnonServer = false
        _AnonServers.push(_CurrentID)
    }
}


function ServerOwnerSearchOnlineCurrently(_CurrentIP, _CurrentID, body) {
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
    var _PlayerNameFound = [];
    var PlayerList = []
    var ServerOwnerInformation = []
    var FoundVariable = false
    for (let i = 0; i < _getPlayers.length; i++) {
        _TotalPlayersFound++
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
                    gsubThis = _getPlayers[i].identifiers[x].replace('fivem:', '')
                    if (gsubThis == _ownerForumID) {
                        FoundVariable = true
                        ServerOwnerInformation.push(_getPlayers[i].identifiers)
                        _TotalFoundByArgument++
                    }
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
            _FailedServerIP = _CurrentIP
            _AnonServer = true 
        }
    }
    if (FoundVariable == true) {
        log(`Server Owner Discovered.........: TRUE`)
        _RequestServerInformation.push({"Server Unique ID": _CurrentID,"Server IPv4": _CurrentIP,"Server Host Name": _serverHostName,"Server Project Name": _projectName,"Server Project Description": _projectDescription,"Server Tags": _serverTags,"Server Discord": _serverDiscord,"Server Owner Forum": _ownerForum,"Server Owner Forum Name": _ownerForumName,"Server Owner Forum ID": _ownerForumID,"Server Support Status": _serverSupportStatus,"Server Purity Level": _purityLevel,"Server Enforce Build": _enforceBuild,"Server Script Hook": _scriptHook,"Server OneSync": _oneSync,"Server Max Clients": _maxClients,"Server Total Clients": _totalClients,"Private Server": _AnonServer,"Server Game Type": _gameType,"Server Country": _country,"Server Host Type": _hostType,"Server Version": _serverVersion,"Server Owner Info": ServerOwnerInformation, "Server Resources": _serverResources,"Server Players": PlayerList})
    }
    if (_AnonServer == true) {
        _AnonServer = false
        _AnonServers.push(_CurrentID)
    }
}


function _getServers() {  // This is pretty big so relax and eat a cookie or some shit. [Estimated Time per 1000 Servers: ~1.5 minutes] (So basically 20 ish minutes if you have good internet)
    var headers = {	'Content-Type': 'application/json',	'Accept-Encoding': 'gzip',    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'};
    var options = {url: 'https://servers-frontend.fivem.net/api/servers/streamRedir/',method: 'GET',headers: headers,gzip: true};
    log(`Current Action..................: SENT GET REQUEST`)
    http(options, function(error, response, body) {
        if (!error && response.statusCode == 200) { 
            const RegularExpression = /\x0A\x06(?! *locale)(?<id>[a-z0-9]{6})\x12([^]*?)?(?<ip>(?:\d{1,3}\.){3}\d{1,3}:\d{1,5})/gim 
            for (const match of body.matchAll(RegularExpression)) {
                _ServerCache.push({id: match.groups.id,ip: match.groups.ip,})
                _TotalServersCached++   
            }
            log(`Current Action..................: ${globalTask}`)
            log(`Cached Servers..................: ${_TotalServersCached}`)
            _Execute()
        }else{
            log(`Error...........................: FiveM API Couldn't be reached? API Down or Internet Down?`)
            _exit()
        }
    });
}


async function CommitAction(_CurrentIP, _CurrentID, body) {
    var getArumentChoice = _Arg3
    if (getArumentChoice == '-Sn') { // Search by Server Name
        SearchByServerName(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Sd') { // Search by Server ID
        SearchByServerID(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Rn') { // Search by ResourceName
        SearchByResourceName(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Pc') { // Search by Player Count
        SearchByPlayerCount(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-O') { // Search by OneSync Boolean
        SearchByOneSync(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-S') { // Search by Scripthook Boolean
        SearchByScripthook(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-B') { // Search by Build Version
        SearchByBuildVersion(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-H') { // Search by Host Type
        SearchByHostType(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Su') { // Search by Support Type Boolean
        SearchBySupportType(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Pn') { // Player Name Searching [Only Live Data]
        PlayerNameSearch(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Pi') { // Player Identifier Searching [Only Live Data]
        PlayerIdentifierSearch(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Sq') { // Scrape All Information from servers and players
        ScrapeAllInformation(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Co') { // Scrape All Servers to see if the server owner is currently online
        ServerOwnerSearchOnlineCurrently(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-RnF') { // Search by Resource Framwork
        SearchByResourceName(_CurrentIP, _CurrentID, body)
    }else if (getArumentChoice == '-Psc') { // Search by Scraping All the players and not the server information
        ScrapeAllPlayers(_CurrentIP, _CurrentID, body)
    }else{
        log(`Error...........................: Invalid Argument Detected`)
        _exit()
    }
}


async function CommitActionString() {
    var getArumentChoice = _Arg3
    var currentAction = 'N/A'
    if (getArumentChoice == '-Sn') { // Search by Server Name
        currentAction = "Server-Name-Search"
    }else if (getArumentChoice == '-Sd') { // Search by Server ID
        currentAction = "Server-ID-Search"
    }else if (getArumentChoice == '-Rn') { // Search by ResourceName
        currentAction = "Resource-Name-Search"
    }else if (getArumentChoice == '-Pc') { // Search by Player Count
        currentAction = "Player-Count-Search"
    }else if (getArumentChoice == '-O') { // Search by OneSync Boolean
        currentAction = "OneSync-Search"
    }else if (getArumentChoice == '-S') { // Search by Scripthook Boolean
        currentAction = "Scripthook-Search"
    }else if (getArumentChoice == '-B') { // Search by Build Version
        currentAction = "Build-Version-Search"
    }else if (getArumentChoice == '-H') { // Search by Host Type
        currentAction = "Host-Type-Search"
    }else if (getArumentChoice == '-Su') { // Search by Support Type Boolean
        currentAction = "Support-Type-Search"
    }else if (getArumentChoice == '-Pn') { // Player Name Searching [Only Live Data]
        currentAction = "Player-Name-Search"
    }else if (getArumentChoice == '-Pi') { // Player Identifier Searching [Only Live Data]
        currentAction = "Player-Identifier-Search"
    }else if (getArumentChoice == '-Sq') { // Scrape All Information from servers and players
        currentAction = "Scrape-All-Information"
    }else if (getArumentChoice == '-Co') { // Scrape All Servers to see if the server owner is currently online
        currentAction = "Server-Owner-Search-Online-Currently"
    }else if (getArumentChoice == '-RnF') { // Search by Resource Framwork
        currentAction = "Server-Framework-Search"
    }else if (getArumentChoice == '-Psc') { // Search by Scraping All the players and not the server information
        currentAction = "Scrape-All-Players"
    }else{
        log(`Error...........................: Invalid Argument Detected`)
        _exit()
    }
    globalTask = currentAction
}

async function _ExecuteAgain(_CurrentIP, _CurrentID) {
    var _FailedServerID = ''  // We are going to need this because we are going to retry the request if it fails
    var _FailedServerIP = '' // We are going to need this because we are going to retry the request if it fails
    var _CheckFailed = false // Check if we failed to request a server
    var headers = {	'Content-Type': 'application/json',	'Accept-Encoding': 'gzip','user-agent': 'Mozilla/5.0'};
    var options = {url: `https://servers-frontend.fivem.net/api/servers/single/${_CurrentID}`,method: 'GET',headers: headers,gzip: true};
    http(options, function(error, response, body) {
        var _CurrentIP = _CurrentIP
        var _CurrentID = _CurrentID
        if (!error && response.statusCode == 200) {
            CommitAction(_CurrentIP, _CurrentID, body)
            _TotalRecoveredServers++
        }else{
            if (response.statusCode == 404) {
                _TotalOfflineServers++
                _FailedServerID = _CurrentID
                _FailedServerIP = _CurrentIP
                _CheckFailed = true 
            }else{
                _TotalFailedRequestes++ 
            }
        }
        _TotalServersFinished++
        console.clear()
        log("\n")
        log(`\t[Current ID: ${_CurrentID} | Current IP: ${_CurrentIP}]\n`)
        log(`Current Action..................: ${globalTask}`)
        log(`Total Players Captured..........: ${_TotalPlayersFound}`)
        log(`Total Servers Finished..........: ${_TotalServersFinished} / ${_TotalServersCached}`)
        log(`Recovered Servers...............: ${_TotalRecoveredServers}`)
        log(`Offline Servers.................: ${_TotalOfflineServers}`)
        log(`Private Servers.................: ${_AnonServers.length}`)
        log(`Failed Requests.................: ${_TotalFailedRequestes}`)
        log(`Arguments Requested.............: [${_Arg1}, ${_Arg2}, ${_Arg3}]`)
        log(`Total Variables Found...........: ${_TotalFoundByArgument}`)
    });
    if (_CheckFailed == true) {
        log(`Request Failed..................: ${_FailedServerIP} - ${_FailedServerID}`)
        _TotalFailedRequestes++
    }
}

    
async function _Execute() { 
    var _FailedServerID = ''  // We are going to need this because we are going to retry the request if it fails
    var _FailedServerIP = '' // We are going to need this because we are going to retry the request if it fails
    var _CheckFailed = false // Check if we failed to request a server
    for (let i =0; i < _ServerCache.length; i++) {
        if (i % 75 === 0) { // Every 75 servers, wait 3 seconds to prevent rate limit (This is a nice way to prevent ratelimit issues in the future)
            await _delay(3000);
        }
        var headers = {	'Content-Type': 'application/json',	'Accept-Encoding': 'gzip','user-agent': 'Mozilla/5.0'};
        var options = {url: `https://servers-frontend.fivem.net/api/servers/single/${_ServerCache[i].id}`,method: 'GET',headers: headers,gzip: true};
        http(options, function(error, response, body) {
            var _CurrentIP = _ServerCache[i].ip
            var _CurrentID = _ServerCache[i].id
            if (!error && response.statusCode == 200) {
                CommitAction(_CurrentIP, _CurrentID, body)
            }else{
                _FailedServerID = _CurrentID
                _FailedServerIP = _CurrentIP
                _CheckFailed = true 
            }
            _TotalServersFinished++
            console.clear()
            log("\n")
            log(`\t[Current ID: ${_CurrentID} | Current IP: ${_CurrentIP}]\n`)
            log(`Current Action..................: ${globalTask}`)
            log(`Total Players Captured..........: ${_TotalPlayersFound}`)
            log(`Total Servers Finished..........: ${_TotalServersFinished} / ${_TotalServersCached}`)
            log(`Recovered Servers...............: ${_TotalRecoveredServers}`)
            log(`Offline Servers.................: ${_TotalOfflineServers}`)
            log(`Private Servers.................: ${_AnonServers.length}`)
            log(`Failed Requests.................: ${_TotalFailedRequestes}`)
            log(`Arguments Requested.............: [${_Arg1}, ${_Arg2}, ${_Arg3}]`)
            log(`Total Variables Found...........: ${_TotalFoundByArgument}`)
        });
        if (_CheckFailed == true) {
            log(`Request Failed..................: ${_FailedServerIP} - ${_FailedServerID}`)
            await _delay(5000);
            _CheckFailed = false
            _ExecuteAgain(_FailedServerIP, _FailedServerID)
        }
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
            _getServers()
            _saveArray()
        });
    }else{
        _getServers()
        _saveArray()
    }
});
