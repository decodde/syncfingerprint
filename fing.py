# coding : utf-8

import acoustid
import chromaprint
import logging
import numpy as np
import matplotlib.pyplot as plt

from subprocess import run, PIPE
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/audio', methods=['POST'])
def audio():
    f = request.data
    with open('./audio.wav', 'wb') as audio:
        audio.write(f)
    print('file uploaded successfully')
    #match("audio.wav")
    audio_fingerprint("audio.wav")
    match("audio.wav")
    return "<p>working on it</p>"

def audio_fingerprint(path):
    duration,fp_encoded = acoustid.fingerprint_file(path)
    print("fp encoded is : ",fp_encoded)
    fingerprint,version = chromaprint.decode_fingerprint(fp_encoded)
    fig = plt.figure()
    print(fig)
    bitmap = np.transpose(np.array([[b == '1' for b in list('{:32b}'.format(i & 0xffffffff))] for i in fingerprint]))

    plt.imshow(bitmap)
    print(fingerprint)
    print(duration)
    print(version)

def match(path):
    
    print("...matching.........")
    result = acoustid.match('HVAjaRnJuC', path)
    print(result)
    for score,recording_id,title,artist in acoustid.match('HVAjaRnJuC', path):
        print(score, artist , title)
    return result
    

if __name__ == "__main__":
    app.logger = logging.getLogger('audio-gui')
    app.run(host='0.0.0.0',ssl_context="adhoc")
