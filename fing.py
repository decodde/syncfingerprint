# coding : utf-8
import acoustid
import logging
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
    return match("audio.wav")

def match(path):
    result = acoustid.match('HVAjaRnJuC', path)
    for score,recording_id,title,artist in acoustid.match('HVAjaRnJuC', path):
        print(score, artist , title)
    return result
    

if __name__ == "__main__":
    app.logger = logging.getLogger('audio-gui')
    app.run(host='0.0.0.0')