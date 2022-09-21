import os 
import time 
def _getCurrentTime():
    return time.strftime("%H:%M:%S")
def log(text):
    print("[" + _getCurrentTime() + "] " + text)
def _installNodeJSPackages():
    log("Installing [Request] Package")
    os.system('npm i request --prefix ./Javascript') # Fixed Requests => Request [Must run in the __init.py dir)
    os.system('cls || clear')
    log("Ignore the [npm WARN] messages. They are not important.") # Ignore the log messages within the npm install
    log("Finished Installing [Request] Package")
    log("Finished Install Process, you may now use the tool")
    exit()
_installNodeJSPackages()
