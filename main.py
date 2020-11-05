from flask import Flask
app = Flask(__name__)

@app.route("/")
    def home():
        return {ty:"",d:"dd"}

if __name__ == "__main__":
    app.run(port=5001)