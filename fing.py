# coding : utf-8

import os, sys
from acrcloud.recognizer import ACRCloudRecognizer

import logging

import json

from subprocess import run, PIPE
from flask import Flask, render_template, request

app = Flask(__name__)

if __name__ == '__main__':
    config = {
        #Replace "xxxxxxxx" below with your project's host, access_key and access_secret.
        'host':'identify-eu-west-1.acrcloud.com',
        'access_key':'051b2d4b654e73a0d73f68030a186f05', 
        'access_secret':'DG8rgtSnKOrCyRAhbu4HcEQ1RG69E9Pq7qeeVf7h',
        'timeout':10 # seconds
    }

    re = ACRCloudRecognizer(config)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/audio', methods=['POST'])
async def audio():
    f = request.data
    with open('./audio.wav', 'wb') as audio:
        audio.write(f)
    print('file uploaded successfully')
    r = await recognize("audio.wav")
    return r


async def recognize(path):
    who = re.recognize_by_file(path,0)
    who = json.loads(json.dumps(who))
    if who.get('status').get('msg') == "Success" :
        return who
    else :
        return false
    

if __name__ == "__main__":
    app.logger = logging.getLogger('audio-gui')
    app.run(host='0.0.0.0',ssl_context="adhoc")
