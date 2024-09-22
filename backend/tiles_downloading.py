import os
import json
import re
import cv2
import argparse
from datetime import datetime
import math

from image_downloading import download_image

file_dir = os.path.dirname(__file__)
prefs_path = os.path.join(file_dir, 'preferences.json')
default_prefs = {
        'url': 'https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'tile_size': 256,
        'channels': 3,
        'dir': os.path.join(file_dir, 'images'),
        'headers': {
            'cache-control': 'max-age=0',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'
        },
        'tl': '',
        'br': '',
        'zoom': ''
    }

def take_input(messages):
    inputs = []
    print('Enter "r" to reset or "q" to exit.')
    for message in messages:
        inp = input(message)
        if inp == 'q' or inp == 'Q':
            return None
        if inp == 'r' or inp == 'R':
            return take_input(messages)
        inputs.append(inp)
    return inputs


def image_helper(tl, br, zoom):
    with open(os.path.join(file_dir, 'preferences.json'), 'r', encoding='utf-8') as f:
        prefs = json.loads(f.read())

    if not os.path.isdir(prefs['dir']):
        os.mkdir(prefs['dir'])
            
    prefs['tl'], prefs['br'], prefs['zoom'] = tl, br, zoom

    lat1, lon1 = tl
    lat2, lon2 = br

    zoom = int(prefs['zoom'])
    channels = int(prefs['channels'])
    tile_size = int(prefs['tile_size'])
    lat1 = float(lat1)
    lon1 = float(lon1)
    lat2 = float(lat2)
    lon2 = float(lon2)

    img = download_image(lat1, lon1, lat2, lon2, zoom, prefs['url'],
        prefs['headers'], tile_size, channels)
    

    # Create a filename with coordinates
    name = f'img_tl_{lat1:.6f}_{lon1:.6f}_br_{lat2:.6f}_{lon2:.6f}.png'
    print(f'Saved as {name}')
    #return image and name
    return (img, name, lat1, lon1, lat2, lon2)
    #cv2.imwrite(os.path.join(prefs['dir'], name), img)
    
def image_loop(coordinates_list, zoom):
    for coords in coordinates_list:
        tl, br = coords
        print("tl is", tl, "br is", br)
        #print(f"Downloading image for top-left: {tl}, bottom-right: {br}, zoom: {zoom}")
        image_helper(tl,br,zoom)
def generate_tiles(bounds, tile_size):
    lat1, lon1 = re.findall(r'[+-]?\d*\.\d+|d+', bounds['top_left'])
    lat2, lon2 = re.findall(r'[+-]?\d*\.\d+|d+', bounds['bottom_right'])

    lat1 = float(lat1)
    lon1 = float(lon1)
    lat2 = float(lat2)
    lon2 = float(lon2)

    # Calculate the number of tiles in the latitude and longitude directions
    lat_steps = math.ceil((lat1 - lat2) / tile_size)
    lon_steps = math.ceil((lon2 - lon1) / tile_size)
    tiles = []
    for i in range(lat_steps):
        for j in range(lon_steps):
            # Calculate the top-left corner of each tile
            tl_lat = lat1 - (i * tile_size)
            tl_lon = lon1 + (j * tile_size)
            
            # Calculate the bottom-right corner of each tile
            br_lat = lat1 - (i + 1) * tile_size
            br_lon = lon1 + (j + 1) * tile_size

            
            tiles.append(((tl_lat, tl_lon), (br_lat, br_lon)))

    return tiles
'''
def run():
    print("hello")
    messages = ['Top-Left corner: ', 'Bottom-Right corner: ', 'Zoom Level: ']
    inputs = take_input(messages)
    print("generating tiles")
    district_bounds = {
        "top_left": (inputs[0]),
        "bottom_right": (inputs[1])
    }
    tiles = generate_tiles(district_bounds, tile_size=0.0033)  # Example values
    image_loop(tiles, 19)

if os.path.isfile(prefs_path):
    run()
else:
    with open(prefs_path, 'w', encoding='utf-8') as f:
        json.dump(default_prefs, f, indent=2, ensure_ascii=False)

    print(f'Preferences file created in {prefs_path}')
    '''