import asyncio
import websockets
import os

async def receive_audio(websocket, path):
    mp3_filename = 'output.mp3'
    wav_filename = 'output.wav'

    # Receive and save the MP3 file
    async for message in websocket:
        # Check if the message can be converted to an integer
        try:
            volume = int(message)  # try to convert the message to an integer
            os.system(f'amixer -c 2  set Speaker {volume}%')
        except ValueError:
            # If the message cannot be converted to an integer, treat it as MP3 data
            with open(mp3_filename, 'wb') as f:
                f.write(message)

            # Convert the MP3 file to WAV
            os.system(f'ffmpeg -y -i {mp3_filename} {wav_filename}')

            # Play the WAV file
            os.system(f'aplay -D plughw:2,0 {wav_filename}')

start_server = websockets.serve(receive_audio, '0.0.0.0', 9764)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
