const axios = require('axios');
const fs = require('fs');
const WebSocket = require('ws');

const CHUNK_SIZE = 1024;
const url = "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL";
const audioSocketUrl = "ws://192.168.111.210:8765"; // WebSocket URL

const headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": "Insert your API key here"
};

const audioSocket = new WebSocket(audioSocketUrl);

function textToSpeech(text) {
  return new Promise((resolve, reject) => {
    const data = {
      "text": text,
      "model_id": "eleven_multilingual_v1",
      "language_id":"de",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    };

    axios.post(url, data, { headers, responseType: 'stream' })
      .then(response => {
        const outputFilePath = 'output.mp3';
        const outputStream = fs.createWriteStream(outputFilePath);

        response.data.pipe(outputStream);

        outputStream.on('finish', () => {
          console.log('Text-to-speech conversion completed. Audio saved to:', outputFilePath);
          resolve(outputFilePath);

          // Read the saved MP3 file and send it through the WebSocket
          const mp3Data = fs.readFileSync(outputFilePath);
          if (audioSocket.readyState === WebSocket.OPEN) {
            audioSocket.send(mp3Data);
          }
        });

        outputStream.on('error', (error) => {
          console.error('Error while saving the audio:', error);
          reject(error);
        });
      })
      .catch(error => {
        console.error('Text-to-speech conversion failed:', error);
        reject(error);
      });
  });
}

module.exports = textToSpeech;
