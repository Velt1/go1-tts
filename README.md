# go1-tts

**Things to do before**
- Install websockets and asyncio on the rasperry pi and the Nano 13 (192.168.123.13)
- AudioRelay.py on the Rasperry PI: python3 AudioRelay.py
- audio_receiver.py on the Nano 13: python3 audio_receiver.py

**How to run**
On own PC:
  1. npm install axios ws
  2. Insert API Key in mp3player.js (get it on https://elevenlabs.io/ )
  3. change the audioSocketUrl to the IP of your Rasperry Pi (Go 1 Wlan: 192.168.12.1)
  4. change language_id to desired language (de, en, it)
  5. insert desired text in textToSpeech function at the bottom
  6. node Mp3Player.js


For more info: https://docs.elevenlabs.io/api-reference/quick-start/introduction
