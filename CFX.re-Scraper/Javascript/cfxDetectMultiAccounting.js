const { exit } = require('process');
const http = require('request');
const fs = require('fs');
var CurrentTime = new Date().getTime();
var _Arg1 = process.argv[2]; // Argument 1
var _Arg2 = process.argv[3]; // Argument 2
var _Arg3 = process.argv[4]; // Argument Type of Execution
FileName =`${CurrentTime}-MultiAccount`
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
var IdentifiersKnown = []
var Idenrtifiers = []

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
                Idenrtifiers.push(identityTable[i].id)
            }
            data = {"Identifiers":identityTable,"Name": _data[i].name, "Server": _data[i]['Server-ID-Seen-In']}
            IdentifiersKnown.push(data)
        } catch (error) {
            log(`Error...........................: This file is not supported - Please use a "Player Scrape All" file`)
            _exit()
        }
    }
    const occurrences = Idenrtifiers.reduce(function (acc, curr) {
        // Only return the keys that have a value of 2 or more
        if (acc[curr]) {
            acc[curr] = acc[curr] + 1;
        } else {
            acc[curr] = 1;
        }
        return acc;
    },{});
    var globalVars = []
    for (x in occurrences) {
        if (occurrences[x] > 1) {
            // Find the users that have the same identifier and add them to the custom arrays within the occurrences object
            for (let i = 0; i < IdentifiersKnown.length; i++) {
                for (let xd = 0; xd < IdentifiersKnown[i].Identifiers.length; xd++) {
                    var Identifiers = []
                    var ServersFound = []
                    var NamesFound = []
                    if (IdentifiersKnown[i].Identifiers[xd].id == x) {
                        if (!globalVars.includes(IdentifiersKnown[i].Identifiers)) {
                            globalVars.push(IdentifiersKnown[i].Identifiers)
                            if (!ServersFound.includes(IdentifiersKnown[i].Server)) {
                                ServersFound.push(IdentifiersKnown[i].Server)
                            }
                            NamesFound.push(IdentifiersKnown[i].Name)
                            for (let cddd = 0; cddd < IdentifiersKnown[i].Identifiers.length; cddd++) {
                                if (!Identifiers.includes(IdentifiersKnown[i].Identifiers[cddd].id)) {
                                    Identifiers.push(IdentifiersKnown[i].Identifiers[cddd].id)
                                }
                            }
                        }
                        for (let i2 = 0; i2 < IdentifiersKnown.length; i2++) {
                            for (let xd2 = 0; xd2 < IdentifiersKnown[i2].Identifiers.length; xd2++) {
                                if (IdentifiersKnown[i2].Identifiers[xd2].id == x) {
                                    if (!globalVars.includes(IdentifiersKnown[i2].Identifiers)) {
                                        globalVars.push(IdentifiersKnown[i2].Identifiers)
                                        if (!ServersFound.includes(IdentifiersKnown[i2].Server)) {
                                            ServersFound.push(IdentifiersKnown[i2].Server)
                                        }
                                        NamesFound.push(IdentifiersKnown[i2].Name)
                                        for (let cddd2 = 0; cddd2 < IdentifiersKnown[i2].Identifiers.length; cddd2++) {
                                            if (!Identifiers.includes(IdentifiersKnown[i2].Identifiers[cddd2].id)) {
                                                Identifiers.push(IdentifiersKnown[i2].Identifiers[cddd2].id)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (Identifiers.length > 0) {
                            var _data = {
                                "Identifiers Used": Identifiers,
                                "Usernames": NamesFound,
                                "Server": ServersFound,
                                "Total Identifiers": Identifiers.length,
                                "Occurences": occurrences[x],
                                'Triggered Identifiers': x,

                            }
                            // Check if names have already been added to the global array
                            _RequestServerInformation.push(_data)
                        }
                    }
                }
            } 
        }
    }
}
//                var _data = {"Using Identifiers": IdentifiersKnown[x].Identifiers ,"Username": IdentifiersKnown[x].Name}
//                _RequestServerInformation.push(_data)


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
