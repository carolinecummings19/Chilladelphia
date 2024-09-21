from pymongo import MongoClient
import requests
import json
import base64
import os
from dotenv import load_dotenv

# connecting to mongodb

# Replace <password> and <your-cluster-url> with actual values
client = MongoClient("mongodb+srv://<username>:<password>@<your-cluster-url>/test")
db = client['satellite_data']  # Database name
collection = db['tiles']       # Collection name

# USGS EarthExplorer API base URL
USGS_API_URL = "https://earthexplorer.usgs.gov/inventory/json/v/1.4.0/"


# roken stuff
load_dotenv()
api_token = os.getenv('USGS_API_TOKEN')

print(api_token) 


# Authenticate and get the API key
def authenticate():
    payload = {
        'apiKey': api_token,
        'datasetName': dataset_name,  # e.g., 'LANDSAT_8_C1'
        'spatialFilter': spatial_filter,  # Coordinates or area of interest
        'temporalFilter': temporal_filter,  # Date range
        'maxResults': 10
    }
    response = requests.post(f"{USGS_API_URL}login", json=payload)
    response_data = response.json()
    
    if response_data['errorCode'] is None:
        return response_data['data']
    else:
        raise Exception("Authentication failed:", response_data['error'])

api_key = authenticate()


#GETTING FROM EARTHEXPLORERS


# Example function to search and download image tiles
def search_and_download(api_key, dataset_name, spatial_filter, temporal_filter):
    payload = {
        'apiKey': api_key,
        'datasetName': dataset_name,  # e.g., 'LANDSAT_8_C1'
        'spatialFilter': spatial_filter,  # Coordinates or area of interest
        'temporalFilter': temporal_filter,  # Date range
        'maxResults': 10
    }

    response = requests.post(f"{USGS_API_URL}search", json=payload)
    search_results = response.json()

    if search_results['errorCode'] is None:
        return search_results['data']['results']
    else:
        raise Exception("Search failed:", search_results['error'])

# Example filters
spatial_filter = {
    'filterType': 'mbr',
    'lowerLeft': {'latitude': 34.0, 'longitude': -118.5},
    'upperRight': {'latitude': 34.2, 'longitude': -118.3}
}
temporal_filter = {
    'start': '2023-01-01',
    'end': '2023-12-31'
}

# Dataset: Choose your desired satellite dataset (e.g., 'LANDSAT_8_C1', 'SENTINEL_2')
dataset_name = 'LANDSAT_8_C1'

# Get search results (list of image tiles)
tiles = search_and_download(api_key, dataset_name, spatial_filter, temporal_filter)


#PUTTING IN MONGODB

# Function to download an image tile and store it in MongoDB
def store_tile_in_mongodb(tile, collection):
    tile_id = tile['entityId']
    tile_url = tile['downloadUrl']  # The actual download URL might be in another field

    # Download the image data
    response = requests.get(tile_url)
    if response.status_code == 200:
        image_data = response.content
        
        # Convert image to base64 encoding to store in MongoDB
        encoded_image = base64.b64encode(image_data).decode('utf-8')

        # Insert the tile metadata and image into MongoDB
        tile_document = {
            'tile_id': tile_id,
            'metadata': tile,   # Store all available metadata
            'image': encoded_image  # Store the image as base64 encoded string
        }
        collection.insert_one(tile_document)
        print(f"Tile {tile_id} stored successfully.")
    else:
        print(f"Failed to download tile {tile_id}")

# Loop over tiles and store each one in MongoDB
for tile in tiles:
    store_tile_in_mongodb(tile, collection)


# TO GET FROM MONGODB

# Query a tile from MongoDB based on some metadata
tile = collection.find_one({'tile_id': '<tile_id>'})

# Decode the base64 image data back into binary
image_data = base64.b64decode(tile['image'])

# Optionally, save the image to disk or display it
with open('tile_image.jpg', 'wb') as img_file:
    img_file.write(image_data)

