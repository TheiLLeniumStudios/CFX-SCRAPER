import os 
import sys
import time 
import datetime
import requests
import json



def checkStatus(Status, CurrentIssue, CurrentMS):
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
    checkStatus(convertJson['status']['description'], convertJson['status']['indicator'], round(convertJsonv2['summary']['mean'], 0)  )
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
                                                                                                  
                                                Created by K3YOMI@github

                                      [Cfx.re Status] """+TableStatus['Status']+""" - """+TableStatus['CurrentIssue']+"""
                                            [CnL Self Time] """+str(TableStatus['CurrentMS'])+""" milliseconds                                                                                                                    
"""


choicesArray = [
    {
    "Choice": "1",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(PROJECT NAME)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Enter the server name (Can be something like 'Carolina%State%Roleplay')",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-Sn",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "2",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(PROJECT IDENTIFIER)",
    "Path": "Javascript/cfxID.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Enter the server ID",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-Sd",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "3",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(RECOMMENDED CHECK)",
    "Path": "Javascript/cfxRecommendations.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Enter the server ID",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-Rc",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "4",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(PLAYER REAL NAME CHECK)",
    "Path": "Javascript/cfxRealName.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Enter the server ID",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-SdRn",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "5",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(RESOURCE SEARCH)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Enter Resource Name",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-Rn",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "6",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(FRAMEWORK SEARCH)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-RnF",
        "Choices": [
            {"Choice": "1", "Name": "ESX", "Value": "esx"},
            {"Choice": "2", "Name": "VRP", "Value": "vrp"},
            {"Choice": "3", "Name": "QBCore", "Value": "qb"},
        ]
    },
    {
    "Choice": "7",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(PLAYER COUNT)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": True,
    "Input Question": "Minimum Player Count",
    "Input Question 2": "Maximum Player Count",
    "Dynamic Choice": False,
    "Dynamic Value": "-Pc",
        "Choices": [
            {"Choice": "1", "Name": "ESX", "Value": "esx"},
            {"Choice": "2", "Name": "VRP", "Value": "vrp"},
            {"Choice": "3", "Name": "QBCore", "Value": "qb"},
        ]
    },
    {
    "Choice": "8",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(ONESYNC CHECK)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-O",
        "Choices": [
            {"Choice": "1", "Name": "OneSync On", "Value": "true"},
            {"Choice": "2", "Name": "OneSync Off", "Value": "false"},
        ]
    },
    {
    "Choice": "9",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(SCRIPTHOOK CHECK)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-S",
        "Choices": [
            {"Choice": "1", "Name": "ScriptHook On", "Value": "true"},
            {"Choice": "2", "Name": "ScriptHook Off", "Value": "false"},
        ]
    },
    {
    "Choice": "10",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(BUILD VERSION CHECK)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Build Version",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-B",
      "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "11",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(HOST CHECK)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-H",
        "Choices": [
            {"Choice": "1", "Name": "Linux", "Value": "linux"},
            {"Choice": "2", "Name": "Windows", "Value": "windows"},
        ]
    },
    {
    "Choice": "12",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(OWNER ACTIVITY CHECK)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-Co",
        "Choices": [
            {"Choice": "1", "Name": "Press [1] To Start", "Value": "undefined"},
        ]
    },
    {
    "Choice": "13",
    "Type": "SERVER",
    "RunAs": "node",
    "Name": "(SUPPPORTED CHECK)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-Su",
        "Choices": [
            {"Choice": "1", "Name": "Supported", "Value": "supported"},
            {"Choice": "2", "Name": "Not Supported", "Value": "end_of_support"},
        ]
    },
    {
    "Choice": "14",
    "Type": "PLAYER",
    "RunAs": "node",
    "Name": "(PLAYER FORUM)",
    "Path": "Javascript/cfxForum.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Forum ID",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-F",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "15",
    "Type": "PLAYER",
    "RunAs": "node",
    "Name": "(PLAYER STEAM)",
    "Path": "Javascript/cfxSteam.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Steam Decimal ID",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-D",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "16",
    "Type": "PLAYER",
    "RunAs": "node",
    "Name": "(PLAYER NAME)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Player Name",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-Pn",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "17",
    "Type": "PLAYER",
    "RunAs": "node",
    "Name": "(PLAYER IDENTIFIER)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": True,
    "Multiple Input": False,
    "Input Question": "Player Identifier",
    "Input Question 2": "N/A",
    "Dynamic Choice": False,
    "Dynamic Value": "-Pi",
        "Choices": [
            {"Choice": "1", "Name": "N/A", "Value": "N/A"},
            {"Choice": "2", "Name": "N/A", "Value": "N/A"},
            {"Choice": "3", "Name": "N/A", "Value": "N/A"},
        ]
    },
    {
    "Choice": "18",
    "Type": "PLAYER",
    "RunAs": "node",
    "Name": "(PLAYER SCRAP ALL)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-Psc",
        "Choices": [
            {"Choice": "1", "Name": "Press [1] To Continue", "Value": "undefined"},
        ]
    },
    {
    "Choice": "19",
    "Type": "ALL_EN",
    "RunAs": "node",
    "Name": "(SCRAP EVERYTHING)",
    "Path": "Javascript/cfxScrape.js",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-Sq",
        "Choices": [
            {"Choice": "1", "Name": "Press [1] To Continue", "Value": "undefined"},
        ]
    },
    {
    "Choice": "20",
    "Type": "NODEJS",
    "RunAs": "py",
    "Name": "(INSTALL PACKAGES)",
    "Path": "Javascript/installPackages.py",
    "Input Required": False,
    "Multiple Input": False,
    "Input Question": "N/A",
    "Input Question 2": "N/A",
    "Dynamic Choice": True,
    "Dynamic Value": "-Sq",
        "Choices": [
            {"Choice": "1", "Name": "Press [1] To Install", "Value": "undefined"},
        ]
    },
]

def questionInput(data):
    if data['Input Required'] == True:
        raw = input(data['Input Question'] + " => ")
        os.system('cls || clear')
        os.system(data['RunAs'] + " " + data['Path'] + " " + raw + " undefined " + " "+data['Dynamic Value']+"")
    if data['Dynamic Choice'] == True:
        for x in data['Choices']:
            print(f"[{x['Choice']}]\t{x['Name']}")
        choosen = input("Select an option => ")
        for x in data['Choices']:
            if (x['Choice']) == (choosen):
                os.system('cls || clear')
                os.system(data['RunAs'] + " " + data['Path'] + " " +x['Value']+" undefined "+data['Dynamic Value']+"")
    if data['Multiple Input'] == True:
        raw = input(data['Input Question'] + " => ")
        raw2 = input(data['Input Question 2'] + " => ")
        os.system('cls || clear')
        os.system(data['RunAs'] + " " + data['Path'] + " " + raw + " " + raw2 + " "+data['Dynamic Value']+"")

        
def _initChoosen():
    try:
        global CurrentIssue
        os.system("title " + "CFX.re Scraper - Created by K3YOMI@Github")
        os.system('cls || clear')
        print(_Logo_)
        print(f"[#]\t[Type]\t\t[Action]")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        for x in choicesArray:
            if (int(x['Choice']) < 10):
                print(f"[0" + x['Choice'] + "] \t["+x['Type']+"]\t" + x['Name']+'')
            else:
               print(f"[" + x['Choice'] + "] \t["+x['Type']+"]\t" + x['Name']+'')
        print('\n')
        choosen = input("Select an option :: ")
        for x in choicesArray:
            if (x['Choice']) == (choosen):
                questionInput(x)
    except KeyboardInterrupt:
        print("\n[!] Exiting...")
        exit()

_initChoosen()

    
