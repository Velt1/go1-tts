import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
         async with websockets.connect('ws://192.168.123.13:9764') as dest_ws:
                await dest_ws.send(message)

start_server = websockets.serve(echo, '0.0.0.0', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
