import os 
import sys
import time 
import datetime
import requests
import json



def RoundError(Status, CurrentIssue, CurrentMS):
    if Status == "All Systems Operational":
        TableStatus['Status'] = "\033[92mAll Systems Operational\033[0m"
        TableStatus['CurrentIssue'] = "\033[92mN/A\033[0m"
    else:
        TableStatus['Status'] = "\033[91mAll Systems Not Operational\033[0m"
        TableStatus['CurrentIssue'] = "\033[91m"+CurrentIssue+"\033[0m"
    if int(CurrentMS) < 273:
        TableStatus['CurrentMS'] = "\033[92m" + str(CurrentMS) + "\033[0m"
    else:
        TableStatus['CurrentMS'] = "\033[91m" + str(CurrentMS) + "\033[0m"
TableStatus = {"Status": "","CurrentMS": "","CurrentIssue": "",}
try:
    request_get = requests.get('https://status.cfx.re/api/v2/status.json')
    request_getv2 = requests.get('https://status.cfx.re/metrics-display/1hck2mqcgq3h/day.json')
    convertJson = request_get.json()
    convertJsonv2 = request_getv2.json()
    RoundError(convertJson['status']['description'], convertJson['status']['indicator'], round(convertJsonv2['summary']['mean'], 0)  )
except Exception as e:
    TableStatus['Status'] = "\033[91mFailed To Fetch\033[0m"
    TableStatus['CurrentIssue'] = "\033[91mErr\033[0m"
    TableStatus['CurrentMS'] = "\033[91mErr\033[0m"


_Logo_ = """

             ██████ ███████ ██   ██    ██████  ███████     ███████  ██████ ██████   █████  ██████  ███████ ██████  
            ██      ██       ██ ██     ██   ██ ██          ██      ██      ██   ██ ██   ██ ██   ██ ██      ██   ██ 
            ██      █████     ███      ██████  █████       ███████ ██      ██████  ███████ ██████  █████   ██████  
            ██      ██       ██ ██     ██   ██ ██               ██ ██      ██   ██ ██   ██ ██      ██      ██   ██ 
             ██████ ██      ██   ██ ██ ██   ██ ███████     ███████  ██████ ██   ██ ██   ██ ██      ███████ ██   ██       
                                                                                                  
                                             Created by K3YOMI@github [RA66IT]
                                 I am not responsible for any damage caused by this tool.
                 (I am awaiting for d-bub to revamp the server list api so this cant be done in the future)

                                      [Cfx.re Status] """+TableStatus['Status']+""" - """+TableStatus['CurrentIssue']+"""
                                            [CnL Self Time] """+str(TableStatus['CurrentMS'])+""" milliseconds                                                                                                                    
"""

def _searchServerName():
    getRegex = input("Enter the server name (Can be something like 'csrp'): ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex + " undefined " + " -Sn") # Server Name
def _searchServerID():
    getRegex234 = input("Enter the server ID: ")
    os.system('cls || clear')
    os.system("node Javascript/NodeServerID.js " + getRegex234+ " undefined " + " -Sd") # Server ID
def _searchServerResource():
    getRegex = input("Enter the server resource name: ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex+ " undefined " + " -Rn") # Server Resource Name
def _searchServerPlayerCount():
    getMin = input("Min Playercount (Example: 5): ")
    getMax = input("Max Playercount (Example: 10): ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getMin + " " + getMax + " -Pc") # Server Player Count
def _searchBooleanOneSync():
    getRegex = input("OneSync [true/false]: ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex + " undefined " + " -O") # OneSync
def _searchBooleanScriptHook():
    getRegex = input("ScriptHook [true/false]: ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex+ " undefined " + " -S") # ScriptHook
def _searchBuildVersion():
    getRegex = input("Enter the build version: ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex+ " undefined " + " -B") # Build Version
def _searchHostType():
    print("[1] Linux")
    print("[2] Windows")
    getRegex = input("Enter your choice: ")
    if getRegex == "1":
        os.system('cls || clear')
        os.system("node Javascript/Node.js linux" + " undefined " + " -H") # Host Type
    elif getRegex == "2":
        os.system('cls || clear')
        os.system("node Javascript/Node.js windows"+ " undefined " + " -H") # Host Type
def _searchSupportType():
    print("[1] Support")
    print("[2] No Support")
    getRegex = input("Enter your choice: ")
    if getRegex == "1":
        os.system('cls || clear')
        os.system("node Javascript/Node.js supported"+ " undefined " + " -Su") # Support Type
    elif getRegex == "2":
        os.system('cls || clear')
        os.system("node Javascript/Node.js end_of_support"+ " undefined " + " -Su") # Support Type
def _searchForumID():
    getRegex = input("Enter the forum ID: ")
    os.system('cls || clear')
    os.system("node Javascript/NodeForum.js " + getRegex+ " undefined " + " -F") # Forum ID
def _searchSteamDecToHex(): # Easy way to convert the steam decimal ID to a link [Base16 Conversion] :D
    getRegex = input("Enter the Steam Decimal: ")
    os.system('cls || clear')
    os.system("node Javascript/NodeSteam.js " + getRegex+ " undefined " + " -D") # Steam Decimal to Hex
def _runPlayerNameSearch():
    getRegex = input("Enter the player name: ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex+ " undefined " + " -Pn") # Player Name
def _runPlayerIdentifierSearch():
    getRegex = input("Enter the player identifier: ")
    os.system('cls || clear')
    os.system("node Javascript/Node.js " + getRegex+ " undefined " + " -Pi") # Player Identifier
def _searchServerOwnerCheck():
    os.system('cls || clear')
    os.system("node Javascript/Node.js undefined undefined " + " -Co") # Server Owner
def _scrapeEverything():
    os.system('node Javascript/Node.js'+ " undefined undefined " + " -Sq") # Scrape Everything
def _installNodeJS():
   os.system('py Javascript/_install.py')

_ChoicesArray = [  #Low-key pretty smart for doing this method instead of use if-else statements lmao
    {"Choice": "1", "Type": "SERVER", "Name": "Name Search",  "Function": _searchServerName},
    {"Choice": "2", "Type": "SERVER", "Name": "ID Search", "Function": _searchServerID},
    {"Choice": "3", "Type": "SERVER", "Name": "Resource Search", "Function": _searchServerResource},
    {"Choice": "4", "Type": "SERVER", "Name": "Player Count Search", "Function": _searchServerPlayerCount},
    {"Choice": "5", "Type": "SERVER", "Name": "OneSync Search", "Function": _searchBooleanOneSync},
    {"Choice": "6", "Type": "SERVER", "Name": "ScriptHook Search", "Function": _searchBooleanScriptHook},
    {"Choice": "7", "Type": "SERVER", "Name": "Build Version Search", "Function": _searchBuildVersion},
    {"Choice": "8", "Type": "SERVER", "Name": "Host Type Search", "Function": _searchHostType},
    {"Choice": "9", "Type": "SERVER", "Name": "Online Owner Check", "Function": _searchServerOwnerCheck},
    {"Choice": "10", "Type": "SERVER", "Name": "Support Type Search", "Function": _searchSupportType},
    {"Choice": "11", "Type": "PLAYER", "Name": "Forum ID Search", "Function": _searchForumID},
    {"Choice": "12", "Type": "PLAYER", "Name": "Steam Decimal to Hex Search", "Function": _searchSteamDecToHex},
    {"Choice": "13", "Type": "PLAYER", "Name": "Name Search", "Function": _runPlayerNameSearch},
    {"Choice": "14", "Type": "PLAYER", "Name": "Identifier Search", "Function": _runPlayerIdentifierSearch},
    {"Choice": "15", "Type": "ALL_EN", "Name": "Everything", "Function": _scrapeEverything},
    {"Choice": "16", "Type": "NodeJS", "Name": "Install NodeJS Packages", "Function": _installNodeJS}

]


def _initChoosen():
    try:
        global CurrentIssue
        os.system("title " + "CFX.re Scraper - Created by K3YOMI@Github")
        os.system('cls || clear')
        print(_Logo_)
        print(f"[#]\t[Type]\t\t[Action]")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        for x in _ChoicesArray:
            if (int(x['Choice']) < 10):
                print(f"[0" + x['Choice'] + "] \t["+x['Type']+"]\t" + x['Name'])
            else:
               print(f"[" + x['Choice'] + "] \t["+x['Type']+"]\t" + x['Name'])
        print('\n')
        choosen = input("Select an option :: ")
        for x in _ChoicesArray:
            if (x['Choice']) == (choosen):
                x['Function']()
    except KeyboardInterrupt:
        print("\n[!] Exiting...")
        exit()

_initChoosen()


    
